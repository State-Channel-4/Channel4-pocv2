const express = require('express')
const cc = require('../controllers/contractController')
const { authenticate } = require('../middleware/auth');


const router = express.Router()

// create user
router.post('/user', cc.create_user)

// test
router.post('/test', cc.test)

// login
router.post('/login', cc.login)

// get users
router.get('/users', authenticate, cc.get_all_users)

// get specific user
router.get('/user/:id', authenticate, cc.get_specific_user)

// recover key
router.post('/recover_key', cc.recover_key)

// vote upvote or downvote
router.put('/vote/:id', authenticate, cc.vote)

// submit url
router.post('/url', authenticate, cc.submit_url)

// delete url
router.delete('/url', authenticate, cc.delete_url)


// creating tags
router.post('/tag', authenticate, cc.create_tag)

// fetch url by tags
router.get('/url/tag', cc.getUrlsByTags)


// switch aka get random url from smart contract

module.exports = router