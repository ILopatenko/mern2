//Import JWT
const jwt = require('jsonwebtoken');

//Import CONFIG
const config = require('config');

module.exports = (req, res, next) => {
  //Get a token from header
  const token = req.header('x-auth-token');
  //Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, autorization denied' });
  }
  //Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
