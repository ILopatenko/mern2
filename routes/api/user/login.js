//Import EXPRESS
const express = require('express');

//Import EXPRESS ROUTER
const router = express.Router();

//Import a MIDDLEWARE function
const auth = require('../../../middleware/auth');

//Import User model
const User = require('../../../models/User');

//Import check and validationResult to work with data from REQUEST
const { check, validationResult } = require('express-validator');

//Import JWT
const jwt = require('jsonwebtoken');

//Import BCRYPT
const bcrypt = require('bcryptjs');

//Import CONFIG
const config = require('config');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
});

router.post(
  '/',
  [
    check('email', 'Check EMAIL and try again').trim().isEmail(),
    check('password', 'Password is required').trim().exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //DESTRUCTURING EMAIL and PASSWORD from request (req.body.email, req.body.password)
    const { email, password } = req.body;

    try {
      //Try to find USER with email from request in DATABASE
      let user = await User.findOne({ email });
      //If USER was not found - return status code 400 with a message
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      //If USER was found in DATABASE
      //Check if  password from request is the same as a user.password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      //Create a payload for generate a JWT
      const payload = { user: { id: user.id } };
      //Generate a TOKEN
      jwt.sign(
        payload,
        config.get('secretForJWT'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          //If no any errors - sent a JWT as response
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error!');
    }
  }
);
module.exports = router;
