//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
//Import a MIDDLEWARE function
const auth = require('../../../middleware/auth');
//Import User model
const User = require('../../../models/User');
//Import Post model
const Post = require('../../../models/Post');
//Import check and validationResult to work with data from REQUEST
const { check, validationResult } = require('express-validator');
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      //Try to find USER with ID from request in DATABASE
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.send(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error!');
    }
  }
);
module.exports = router;
