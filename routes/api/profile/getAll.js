//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
//Import Profile model
const Profile = require('../../../models/Profile');

//After REQUEST to this route server will do auth MIDLEWARE (private route)
router.get('/', async (req, res) => {
  try {
    //create a variable for store/work with all the profiles.
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
});
module.exports = router;
