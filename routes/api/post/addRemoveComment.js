//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
//Import Profile model
const Post = require('../../../models/Post');
//Import a MIDDLEWARE function
const auth = require('../../../middleware/auth');
//Import check and validationResult to work with data from REQUEST
const { check, validationResult } = require('express-validator');

router.post(
  '/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      return res.json(post.likes);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId')
        return res.status(404).json('Post not found');
      res.status(500).send('Server error!');
    }
  }
);

router.delete('/:id/:comment_id', auth, async (req, res) => {
  const errors = validationResult(req);
  try {
    //Create a variable for store/work with a user.
    const post = await Post.findById(req.params.id);
    //Pull out a comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //Check if comment exists
    if (!comment)
      return res.status(404).json({ msg: 'Comment does not exist' });
    //Check user
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });
    //Get a remove index
    const removeIndex = post.comments
      .map((eachComment) => eachComment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    return res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json('Post not found');
    }
    res.status(500).send('Server error!');
  }
});
module.exports = router;
