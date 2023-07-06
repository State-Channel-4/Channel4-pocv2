const ethers = require('ethers')
require('dotenv').config()

// Models
const { User, Tag, Url } = require('../models/schema');

const { generateToken } = require('../middleware/auth');


const create_contract = () => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, process.env.ABI, provider)
    return contract
}

// create user
const create_user = async(req, res) => {
  const {address} = req.body
  try {
    const user = await User.create({walletAddress: address})
    const token = generateToken(user);
    res.status(200).json({
      user: user,
      token,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get all users
const get_all_users = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameters, default to 1 if not provided
    const limit = parseInt(req.query.limit) || 100; // Get the limit from query parameters, default to 100 if not provided

    const [users, count] = await Promise.all([
      User.find()
        .skip((page - 1) * limit) // Skip the appropriate number of documents based on the page and limit
        .limit(limit), // Limit the number of documents returned per page
      User.countDocuments()
    ]);

    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;

    res.status(200).json({
      users: users,
      hasNextPage
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
};


// login
const login = async(req, res) => {
  try{
    const {signedMessage} = req.body

    const message = process.env.LOGIN_SECRET;
    const signer = ethers.verifyMessage(message, signedMessage);
    const user = await User.findOne({walletAddress: signer })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    console.log("user : ", user)
    const token = generateToken(user)
    console.log("token : ", token)
    return res.status(200).json({user: user, token: token})
  } catch(error) {
    return res.status(500).json({error : error.message})
  }
}

// get user by id
/**
 *
 * @param {object} req request object
 * @param {object} res response object
 * how to call
 * {
 * localhost:4000/api/user/:id
 * localhost:4000/api/user:/123
 * }
 */
const get_specific_user = async(req, res) => {
  console.log("get user by id : ", req.params.id)
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({user: user})
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}


// recover using mnemonic phrase
const recover_account = async(req, res) => {
    const { mnemonic } = req.body
    try {
        console.log("mnemonic : ", mnemonic)
        const mnemonicWallet = ethers.Wallet.fromPhrase(mnemonic);
        console.log("private key : ", mnemonicWallet.privateKey)
        res.status(200).json({address: mnemonicWallet.address,
                              public_key: mnemonicWallet.publicKey,
                              private_key: mnemonicWallet.privateKey},
                              )
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

// PUT toogle likes like or unlike
const toggleLike = async (req, res) => {
  try {
    const url_id = req.params.id
    const { address } = req.body
    const existingUser = await User.findOne({walletAddress: address })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Check if the like value already exists in the array
    if (!existingUser.likedUrls.includes(url_id)) {
      // Append to the likes array if the value is not already present
      const url = await Url.findByIdAndUpdate(url_id, {$inc: {likes: 1}},  { new: true })
      existingUser.likedUrls.push(url)
    } else {
      // Unlike the URL if it was previously liked
      const index = existingUser.likedUrls.indexOf(url_id)
      if (index > -1) {
        // Remove from the likes array
        existingUser.likedUrls.splice(index, 1)
        // Decrement like count
        await Url.findByIdAndUpdate(url_id, {$inc: {likes: -1}},  { new: true })
      }
    }
    await existingUser.save()
    return res.json(existingUser)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}


// vote
/**
 *
 * @param {object} req
 * @param {object} res
 * @returns json
 * how to call
 * PUT localhost:4000/api/vote/id
 * expected json body in request
 {
 "address": "0x72....."
 }
 */
// like or unlike url
const like = async (req, res) => {
  const {id} = req.params
  console.log("id : ", id)
  console.log("body : ", req.body)
  return toggleLike(req, res)
}

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns json
 * how to call
 * POST localhost:4000/api/url
 * expected json body in request
 {
  "title": "",
  "url": "",
  "submittedBy" : "user_id not walletaddress",
  "tags": []
 }
 */
 const submit_url = async(req, res) => {
  try {
    const title = req.body.params[0];
    const url = req.body.params[1];
    const tags = req.body.params[2];
    const submittedBy = req.body.userId;

    const existingUrl = await Url.findOne({ url }); // Check if the URL already exists in the database
    if (existingUrl) {
      return res.status(400).json({ error: 'URL already exists' });
    }
    const newUrl = await Url.create({ title: title, url: url, submittedBy: submittedBy, tags: tags }); // Create a new URL document in the database

    // add the url to the corresponding tags
    for(let i = 0; i < tags.length; i++) {
      const tag_id = tags[i]
      // find the tag document
      let tag_doc = await Tag.findById(tag_id)
      tag_doc.urls.push(newUrl.id)
      // Save the tag document to the database
      await tag_doc.save()
    }

    // Add the URL to the user's submittedBy array
    const user = await User.findById(submittedBy)
    user.submittedUrls.push(newUrl.id)
    await user.save()

    return res.status(201).json(newUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

// delete url
const delete_url = async(req, res) => {
  try {
    const {id} = req.body
    const del_url = await Url.deleteOne({"_id": id})
    return res.status(200).json(del_url)
  } catch(error) {
    return res.status(500).json({error : error.message})
  }
}

// creating tags
const create_tag = async(req, res) => {
  try {
    // name createdby
    const name = req.body.params[0];
    const createdBy = req.body.userId;
    const tag = await Tag.create({name: name, createdBy: createdBy})
    res.status(200).json({tag: tag})
  } catch (error) {
    console.log(error)
    return res.status(500).json({error : error.message})
  }
}

// get all tags
const get_all_tags = async(req, res) => {
  try {
    const tags = await Tag.find()
    res.status(200).json({tags: tags})
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: error.message})
  }
}

// Helper function to url URLs based on tags
const fetchUrlsByTags  = async (tags, page = 1, limit = 100) => {
  // Find URLs that have tags that match the extracted tag IDs
  // Populate the 'tags' field of the URLs with the tag names
  try {
    const skipCount = (page - 1) * limit;
    return await Url.find({ tags: { $in: tags } }, {})
    .skip(skipCount)
    .limit(limit)
    .populate('tags', 'name');
  } catch (error) {
    return { "error": error }
  }
}

// return urls by tags. No shuffling
const getUrlsByTags = async (req, res) => {
  try {
    const tags = req.query.tags || ''; // Get the tags from query parameters
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameters, default to 1 if not provided
    const limit = parseInt(req.query.limit) || 100; // Get the limit from query parameters, default to 100 if not provided

    const [urls, count] = await Promise.all([
      Url.find({ tags: { $in: tags } })
        .skip((page - 1) * limit) // Skip the appropriate number of documents based on the page and limit
        .limit(limit), // Limit the number of documents returned per page
      Url.countDocuments({ tags: { $in: tags } })
    ]);

    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;

    res.status(200).json({
      urls: urls,
      hasNextPage
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving URLs by tags' });
  }
};


// Helper function to shuffle an array
// Fisher-Yates algorithm O(n)
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// mix feed
const mix = async (req, res) => {
  try {
    const { tags, page = 1, limit = 100 } = req.query;
    console.log("tags : page : limit ", tags, page, limit)
    // Fetch the URLs based on the provided tags
    const [urls, count] = await Promise.all([
      fetchUrlsByTags(tags, page, limit),
      Url.countDocuments({ tags: { $in: tags } })
    ]);

    // Randomize the order of the URLs
    const randomizedUrls = shuffleArray(urls);

    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;

    return res.status(200).json({ urls: randomizedUrls, hasNextPage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const syncDataToSmartContract = async () => {
  const contract = create_contract();
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, contract.provider);
  const contractWithSigner = contract.connect(wallet);

  // Sync users
  const users = await User.find();
  for (const user of users) {
      await contractWithSigner.addUser(user.walletAddress);
  }

  // Sync URLs
  const urls = await Url.find().populate('submittedBy');
  for (const url of urls) {
      await contractWithSigner.addUrl(url.title, url.url, url.submittedBy.walletAddress, url.id);
  }

  // Sync tags
  const allTags = await Tag.find().populate('createdBy');
  for (const tag of allTags) {
      await contractWithSigner.addTag(tag.name, tag.createdBy.walletAddress);
  }
}

module.exports = {
  create_user,
  login,
  recover_account,
  like,
  submit_url,
  get_all_users,
  get_specific_user,
  create_tag,
  delete_url,
  getUrlsByTags,
  get_all_tags,
  mix,
  syncDataToSmartContract
}
