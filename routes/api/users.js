//Import EXPRESS
const express = require('express');

//Create a router from express ROUTER
const router = express.Router();

//Import GRAVATAR
const gravatar = require('gravatar');

//Import BCRYPT
const bcrypt = require('bcryptjs');

//Import User model (schema)
const User = require('../../models/User');

//Import check and validationResult
const { check, validationResult } = require('express-validator');

//@description: route for REGISTER (create) a new USER
//@route information: POST => api/users
//@access: PUBLIC
router.post(
  '/',
  [
    check('name', 'Please check name and try again')
      .isLength({ min: 6 })
      .isString(),
    check('email', 'Please check email and try again').isEmail(),
    check('password', 'Please check password and try again').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //Check if in database exists a user with the same email (email should be unique)
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //Get users gravatar
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
      //CREATE a new USER
      user = new User({ name, email, avatar, password });
      //Encrypt password with bcrypt
      //1. Create a salt
      const salt = await bcrypt.genSalt(10);
      //2. Change a password to a hash
      user.password = await bcrypt.hash(password, salt);
      //SAVE a new USER
      await user.save();
      //Return jsonwebtoken - TODO!!!
      res.send('USER is REGISTERED');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server ERROR !!!');
    }
  }
);
module.exports = router;
