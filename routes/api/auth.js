//Import EXPRESS
const express = require('express');

//Create a router from express ROUTER
const router = express.Router();

//Import middleware AUTH.js
const auth = require('../../middleware/auth');

//Import JWT
const jwt = require('jsonwebtoken');

//Import User model (schema)
const User = require('../../models/User');

//Import check and validationResult
const { check, validationResult } = require('express-validator');

//Import CONFIG
const config = require('config');

//Import BCRYPT
const bcrypt = require('bcryptjs');

//@description: GET INFORMATION ABOUT USER ========================
//@route information: GET to api/auth
//@access: PUBLIC
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server ERROR');
  }
});
//=============================================================================================

//=============== A U T H E N T I C A T E   U S E R   &   G E T   T O K E N ===================
//@description: route for AUTHENTIFICATION USER
//@route information: POST => api/auth
//@access: PUBLIC
router.post(
  '/',
  [
    check('email', 'Please check email and try again').isEmail(),
    check('password', 'Please check password and try again').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Check if in database exists a user with the same email (email should be unique)
      let user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      const isMAtch = await bcrypt.compare(password, user.password);
      if (!isMAtch)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      //Return jsonwebtoken
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) {
            throw error;
          } else res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server ERROR !!!');
    }
  }
);
//============================================================================
module.exports = router;
