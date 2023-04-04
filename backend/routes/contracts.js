const express = require('express')
const cc = require('../controllers/contractController')


const router = express.Router()

// create user
router.post('/user', cc.create_user)

// get users
router.get('/users', cc.get_all_users)

// get specific user
router.get('/user/:id', cc.get_specific_user)

// recover key
router.post('/recover_key', cc.recover_key)

// vote upvote or downvote
router.put('/vote/:id', cc.vote)

// submit url
router.post('/url', cc.submit_url)

// delete url
router.delete('/url', cc.delete_url)

// creating tags
router.post('/tag', cc.create_tag)

// switch aka get random url from smart contract

module.exports = router