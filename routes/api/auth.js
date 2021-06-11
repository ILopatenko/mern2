const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//@route      GET api/auth
//@desc       Test route
//@access     Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route      POST api/auth
//@desc       Authenticate user & get a JWT
//@access     Public
router.post(
  '/',
  [
    body('email').isEmail().withMessage('Email should be an email'),
    body('password').exists().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //action in case when validation has detected issue
      return res.status(400).json({ errors: errors.array() });
    }
    //Destructuring all the data from req.body to local variables
    const { email, password } = req.body;
    try {
      //action in case when validation has not found a user:
      //1 - See if user with current email exists in database
      let user = await User.findOne({ email });
      if (!user) {
        //if user with this email was not found in database - throw an error
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }
      //2 - checking the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        //if password is wrong - throw an error
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }
      //3 - return a JWT
      //3.1 - create a payload
      const payload = {
        user: {
          id: user.id,
        },
      };
      //3.2 - create a JWT with payload and secret and a callback function
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server error!');
    }
  }
);

module.exports = router;
