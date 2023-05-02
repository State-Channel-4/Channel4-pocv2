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

module.exports = {
  authenticate,
  generateToken,
};
