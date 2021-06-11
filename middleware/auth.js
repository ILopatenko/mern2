const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get a JWT
  const token = req.header('x-auth-token');
  //IF JWT is not exists - throw an error
  if (!token) {
    return res.status(401).json({ msg: 'No token, auth denied!' });
  }
  //Check a JWT
  try {
    //Create a decoded variable with payload (userId, and information abot JWT life time) from decoded JWT
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //Create a new parameter in request with userID - { id: '60c3bdba5debe09dde3855a7' }
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
