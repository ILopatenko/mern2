//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
//Import Profile model
const Profile = require('../../../models/Profile');
//Import User model
const User = require('../../../models/User');
//Import a MIDDLEWARE function
const auth = require('../../../middleware/auth');

//After REQUEST to this route server will do auth MIDLEWARE (private route)
router.delete('/', auth, async (req, res) => {
  try {
    //REMOVE a PROFILE
    //!!!TODO !!! remove all the posts of user
    await Profile.findOneAndRemove({ user: req.user.id });

    //REMOVE a USER
    await User.findOneAndRemove({ _id: req.user.id });

    res.json('User deleted');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
});
module.exports = router;
