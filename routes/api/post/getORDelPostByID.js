//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
//Import Profile model
const Post = require('../../../models/Post');
//Import a MIDDLEWARE function
const auth = require('../../../middleware/auth');
router.get('/:id', auth, async (req, res) => {
  try {
    //create a variable for store/work with all the posts.
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json('Post not found');
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json('Post not found');
    }
    res.status(500).send('Server error!');
  }
});
router.delete('/:id', auth, async (req, res) => {
  try {
    //create a variable for store/work with all the posts.
    const post = await Post.findById(req.params.id);
    //CHECK if post is not an empty
    if (!post) return res.status(404).json('Post not found');
    //CHECK if this post was created by this user
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not atorized' });
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error!');
  }
});
module.exports = router;
