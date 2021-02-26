//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
//Import a MIDDLEWARE function
const auth = require('../../../middleware/auth');
//Import User model
const User = require('../../../models/User');
//Import Profile model
const Profile = require('../../../models/Profile');

//After REQUEST to this route server will do auth MIDLEWARE (private route)
router.get('/', auth, async (req, res) => {
  try {
    //create a variable for store/work with a profile. Find in DATABASE by user.id
    const profile = await Profile.findOne({
      user: req.user.id,
      //and add to a profile name and avatar from USER model
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'There is no profile for this user!' }] });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
});
module.exports = router;
