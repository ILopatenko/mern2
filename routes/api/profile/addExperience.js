//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
//Import Profile model
const Profile = require('../../../models/Profile');
//Import a MIDDLEWARE function
const auth = require('../../../middleware/auth');
//Import check and validationResult to work with data from REQUEST
const { check, validationResult } = require('express-validator');

//After REQUEST to this route server will do auth MIDLEWARE (private route)
router.put(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    //Create a new variable to store/work with experiance
    const newExp = { title, company, location, from, to, current, description };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error ');
    }
  }
);
module.exports = router;
