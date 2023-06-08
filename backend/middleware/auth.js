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

const verifySignedFunctionMessage = async (req, res, next) => {
    try {
        const { signedMessage, address, functionName, params } = req.body;
        // signed transaction string to object
        const tx = ethers.Transaction.from(signedMessage);
        // Recreate the meta transaction
        const urlContract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS,
            process.env.ABI
        );
        const metaTransaction = await urlContract[functionName].populateTransaction(...params);
        // Compare server-side tx with client-side tx
        if (metaTransaction.data !== tx.data) {
            return res.status(401).json({ error: 'The tx data is not equal to the function(params)' });
        }
        // Compare the recovered address with the provided address
        const recoveredAddress = ethers.recoverAddress(tx.unsignedHash, tx.signature);
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            return res.status(401).json({ error: 'Recovered address is not equal to sent address' });
        }
        // Check the tx is sent to the right contract address
        if (tx.to.toLowerCase() !== process.env.CONTRACT_ADDRESS.toLowerCase()) {
            return res.status(401).json({ error: 'The tx is not sent to the right contract address' });
        }
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error verifying signature' });
    }
};


module.exports = {
  authenticate,
  generateToken,
  verifySignedMessage,
  verifySignedFunctionMessage,
};