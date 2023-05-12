const mongoose = require('mongoose')
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
const get_all_users = async(req, res) => {
  console.log("getting all users")
  try {
    const users = await User.find()
    res.status(200).json({users: users})
  } catch(error) {
    res.status(400).json({error: error.message})
  }

}

// login
const login = async(req, res) => {
  try{
    const {signedMessage} = req.body

    const message = "login to backend";
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
    const { title, url, submittedBy, tags } = req.body; // Get the title, URL, and submitter from the request body
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
    return res.status(201).json(newUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

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
    const {name, createdBy} = req.body
    const tag = await Tag.create({name: name, createdBy: createdBy})
    res.status(200).json({tag: tag})
  } catch (error) {
    console.log(error)
    return res.status(500).json({error : error.message})
  }
}

const getUrlsByTags = async(req, res) => {
  try {
    const {tags} = req.body
    // Find URLs that have tags that match the extracted tag IDs
    const urls = await Url.find({ tags: { $in: tags } }, { _id: 1, url: 1 });
    return res.status(200).json({urls: urls})
  } catch(error) {
    console.log(error)
    return res.status(500).json({error: error.message})
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
}