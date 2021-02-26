//Import JWT
const jwt = require('jsonwebtoken');

//Import CONFIG
const config = require('config');

module.exports = (req, res, next) => {
  //get token from request - req.header
  const token = req.header('x-auth-token');

  //check if token does not exist - return status code 400 and message "No token. Authorization denied!"
  if (!token) {
    return res.status(400).json({ msg: 'No token. Authorization denied!' });
  }

  //if token exists - verify the token
  try {
    // decode the TOKEN
    const decoded = jwt.verify(token, config.get('secretForJWT'));
    //Add USER ID from JWT to REQUEST object as a new key with value as an array {id: 'xXxXxX'}
    req.user = decoded.user;
    //make a signal that a function has finished work
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
