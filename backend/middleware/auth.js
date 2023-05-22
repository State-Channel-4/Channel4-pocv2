const ethers = require('ethers');

const jwt = require('jsonwebtoken');
let { expressjwt: express_jwt } = require("express-jwt");
require('dotenv').config()

const jwt_secret = process.env.JWT_SECRET

const authenticate = express_jwt({ secret: jwt_secret, algorithms: ['HS256'] });
console.log("authenticate", authenticate)

const generateToken = (user) => {
  const token = jwt.sign({ id: user._id }, jwt_secret, { expiresIn: '1d' });
  return token;
};


const verifySignedMessage = async (req, res, next) => {
    try {
        const { address, signature, originalMessage } = req.body;

        // Recover the address from the signature
        const recoveredAddress = ethers.utils.verifyMessage(originalMessage, signature);

        // Compare the recovered address with the provided address
        if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
            next();
        } else {
            res.status(401).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error verifying signature' });
    }
};

module.exports = {
  authenticate,
  generateToken,
  verifySignedMessage
};