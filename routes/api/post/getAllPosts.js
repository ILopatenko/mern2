//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
//Import Profile model
const Post = require('../../../models/Post');

//Import a MIDDLEWARE function
const auth = require('../../../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    //create a variable for store/work with all the posts.
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
});
module.exports = router;
