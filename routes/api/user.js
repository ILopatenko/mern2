const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route      POST api/user
//@desc       Register a new user
//@access     Public
router.post(
  '/',
  [
    body('name')
      .isString()
      .withMessage('Name should be a text')
      .not()
      .isEmpty()
      .withMessage('Name can not be empty'),
    body('email')
      .isEmail()
      .withMessage('Email should be an email')
      .not()
      .isEmpty()
      .withMessage('Email can not be empty'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password should be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //action in case when validation has detected issue
      return res.status(400).json({ errors: errors.array() });
    }
    //Destructuring all the data from req.body to local variables
    const { name, email, password } = req.body;
    try {
      //action in case when validation has not detected any issues:
      //1 - See if user with current email exists in database
      let user = await User.findOne({ email });
      if (user) {
        //if user with this email was found in database - throw an error
        return res.status(400).json({
          errors: [{ msg: 'Useralready exists! Try to use another email!' }],
        });
      }
      //2 - Get a gravatar for this email
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
      //3 Create a new user
      user = new User({ name, email, avatar, password });
      //4 - Encrypt user's password
      //4.1 - Create a salt
      const salt = await bcrypt.genSalt(10);
      //4.2 - Hash the password
      user.password = await bcrypt.hash(password, salt);
      //5 - Save a new user model to a database
      await user.save();
      //6 - return a JWT
      //6.1 - create a payload
      const payload = {
        user: {
          id: user.id,
        },
      };
      //6.2 - create a JWT with payload and secret and a callback function
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
