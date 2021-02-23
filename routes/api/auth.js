//Import EXPRESS
const express = require('express');

//Create a router from express ROUTER
const router = express.Router();

//Import middleware AUTH.js
const auth = require('../../middleware/auth');

//Import User model (schema)
const User = require('../../models/User');

//@description: Create a route for AUTHORIZATION
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

module.exports = router;
