const mongoose = require('mongoose')
const ethers = require('ethers')
require('dotenv').config()

// Models
const { User, Tag, Url } = require('../models/schema');

const create_contract = () => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, process.env.ABI, provider)
    return contract
}

// create user
const create_user = async(req, res) => {
    console.log("creating wallet")
    // Generate a wallet
    const wallet = ethers.Wallet.createRandom()
    console.log('address:', wallet.address)
    console.log('mnemonic:', wallet.mnemonic.phrase)
    console.log('privateKey:', wallet.privateKey)
    const walletAddress = wallet.address

    // add public key to database
    try {
        const user = await User.create({walletAddress: walletAddress})
        res.status(200).json({user: user, mnemonic: wallet.mnemonic.phrase, PrivateKey: wallet.privateKey})
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

// get user by id
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
const recover_key = async(req, res) => {
    const { mnemonic } = req.body
    try {
        console.log("mnemonic : ", mnemonic)
        const mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
        console.log(mnemonicWallet.privateKey)
        res.status(200).json({user: mnemonicWallet})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

// PUT upvote
const upvoteUrl = async (req, res) => {
    try {
      const url_id = req.params.id
      const { address } = req.body
      const existingUser = await User.findOne({walletAddress: address })
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' })
      }
      // Check if the upvote value already exists in the array
      if (!existingUser.upvotedUrls.includes(url_id)) {
        // Append to the upvotes array if the value is not already present
        const url = await Url.findByIdAndUpdate(url_id, {$inc: {upvotes: 1}},  { new: true })
        console.log(url)
        existingUser.upvotedUrls.push(url)
        await existingUser.save()
      }
      return res.json(existingUser)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Server error' })
    }
  }

// PUT downvote
const downvoteUrl = async (req, res) => {
  try {
    const url_id = req.params.id
    const { address } = req.body
    const existingUser = await User.findOne({walletAddress: address })
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    // Check if the upvote value already exists in the array
    if (!existingUser.downvotedUrls.includes(url_id)) {
      // Append to the upvotes array if the value is not already present
      const url = await Url.findByIdAndUpdate(url_id, {$inc: {downvotes: 1}},  { new: true })
      console.log("url : ", url)
      existingUser.downvotedUrls.push(url)
      await existingUser.save()
      }
      return res.json(existingUser)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  }

// vote
const vote = async (req, res) => {
  const {id} = req.params
  console.log("id : ", id)
  console.log("body : ", req.body)
  if (req.body.vote === "upvote") {
    return upvoteUrl(req, res)
  }
  else if(req.body.vote === "downvote") {
    return downvoteUrl(req, res)
  }
  else {
    return res.status(403).json({ error: 'Invalid vote input' });
  }
}

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



module.exports = {
    create_user,
    recover_key,
    vote,
    submit_url,
    get_all_users,
    get_specific_user,
    create_tag,
    delete_url
}