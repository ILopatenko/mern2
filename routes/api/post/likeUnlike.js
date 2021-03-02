//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
//Import Profile model
const Post = require('../../../models/Post');
//Import a MIDDLEWARE function
const auth = require('../../../middleware/auth');
router.put('/:id', auth, async (req, res) => {
  try {
    //Create a variable for store/work with a post.
    const post = await Post.findById(req.params.id);
    //CHECK if this post already has not a like from this user
    if (
      post.likes.filter((eachLike) => eachLike.user.toString() === req.user.id)
        .length === 0
    ) {
      post.likes.unshift({ user: req.user.id });
      await post.save();
      return res.json(post.likes);
    } else if (
      post.likes.filter((eachLike) => eachLike.user.toString() === req.user.id)
        .length === 1
    ) {
      //Get a remove index
      const removeIndex = post.likes
        .map((eachLike) => eachLike.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
      await post.save();
      return res.json('Like was deleted');
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json('Post not found');
    }
    res.status(500).send('Server error!');
  }
});
module.exports = router;
