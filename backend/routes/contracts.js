const express = require('express')
const cc = require('../controllers/contractController')
const { authenticate, verifySignedMessage, verifySignedFunctionMessage } = require('../middleware/auth');


const router = express.Router()


/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was created successfully
 *       400:
 *         description: Error in creating user
 */
// create user
router.post('/user', cc.create_user)

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               signedMessage:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was logged in successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/login', cc.login)

// get users
router.get('/users', authenticate, cc.get_all_users)

// get specific user
router.get('/user/:id', authenticate, cc.get_specific_user)

/**
 * @swagger
 * /api/recover_account:
 *   post:
 *     summary: Recover account using mnemonic phrase
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mnemonic:
 *                 type: string
 *     responses:
 *       200:
 *         description: The account was recovered successfully
 *       400:
 *         description: Error in recovering account
 */
// recover key
router.post('/recover_account', cc.recover_account)

/**
 * @swagger
 * /api/vote/{id}:
 *   put:
 *     summary: Toggle the like for a url by a user
 *     tags: [Users, URL]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: The like was toggled successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
// like or unlike a url
router.put('/like/:id', authenticate, verifySignedMessage, cc.like)

/**
 * @swagger
 * /api/url:
 *   post:
 *     summary: Submit a new url
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               url:
 *                 type: string
 *               submittedBy:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: The url was submitted successfully
 *       400:
 *         description: URL already exists
 *       500:
 *         description: Server error
 */
// submit url
router.post('/url', authenticate, verifySignedFunctionMessage, cc.submit_url)


/**
 * @swagger
 * /api/url:
 *   delete:
 *     summary: Delete a url
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: The url was deleted successfully
 *       500:
 *         description: Server error
 */
// delete url
router.delete('/url', authenticate, verifySignedMessage, cc.delete_url)


/**
 * @swagger
 * /api/tag:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: The tag was created successfully
 *       500:
 *         description: Server error
 */
// creating tags
router.post('/tag', authenticate, verifySignedMessage, cc.create_tag)


/**
 * @swagger
 * /api/url/tag:
 *   get:
 *     summary: Fetch URLs by their tags
 *     tags: [URL, Tag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The urls were fetched successfully
 *       500:
 *         description: Server error
 */
// fetch url by tags
router.get('/url/tag', cc.getUrlsByTags)

/**
 * @swagger
 * /api/tag:
 *   get:
 *     summary: Retrieve a list of all tags
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: A list of tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       createdBy:
 *                         type: string
 *       500:
 *         description: Server error
 */

// get all tag
router.get('/tag', cc.get_all_tags)

module.exports = router