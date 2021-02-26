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

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
  }
});
module.exports = router;
