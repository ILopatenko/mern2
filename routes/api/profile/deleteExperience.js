//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
//Import Profile model
const Profile = require('../../../models/Profile');
//Import a MIDDLEWARE function
const auth = require('../../../middleware/auth');
router.delete('/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get an index for removing
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error ');
  }
});
module.exports = router;
