const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');

//@route      GET api/profile/me
//@desc       Get current user's profile
//@access     private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    return res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server ERROR!');
  }
});
//--------------END------------------------------------

//@route      POST api/profile
//@desc       Create/Update user's profile
//@access     private
router.post(
  '/',
  [
    auth,
    [
      body('status').not().isEmpty().withMessage('Status is required'),
      body('skills').not().isEmpty().withMessage('Skills are required'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      facebook,
      linkedin,
      instagramm,
    } = req.body;
    //Build a Profile object
    const profilefields = {};
    profilefields.user = req.user.id;
    if (company) profilefields.company = company;
    if (website) profilefields.website = website;
    if (location) profilefields.location = location;
    if (status) profilefields.status = status;
    if (bio) profilefields.bio = bio;
    if (githubusername) profilefields.githubusername = githubusername;
    if (facebook) profilefields.facebook = facebook;
    if (linkedin) profilefields.linkedin = linkedin;
    if (instagramm) profilefields.instagramm = instagramm;
    if (skills)
      profilefields.skills = skills.split(',').map((skill) => skill.trim());
    //Build a Social object
    profilefields.social = {};
    if (facebook) profilefields.social.facebook = facebook;
    if (linkedin) profilefields.social.linkedin = linkedin;
    if (instagramm) profilefields.social.instagramm = instagramm;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //UPDATE A PROFILE
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefields },
          { new: true }
        );
        return res.json(profile);
      }
      //CREATE A NEW PROFILE
      profile = new Profile(profilefields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server ERROR!');
    }
  }
);
//--------------END------------------------------------

//@route      GET api/profile
//@desc       Get all the profiles
//@access     Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server ERROR!');
  }
});
//--------------END------------------------------------

//@route      GET api/profile/user/:userID
//@desc       Get a profile by user ID
//@access     Public
router.get('/user/:userID', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userID }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server ERROR!');
  }
});
//--------------END------------------------------------

//@route      DELETE api/profile
//@desc       Delete user (User, Profile and Posts)
//@access     private
router.delete('/', auth, async (req, res) => {
  try {
    //!!!@TODO!!! - REMOVE all the user's posts!!!
    //REMOVE a Profile
    await Profile.findOneAndDelete({ user: req.user.id });
    //REMOVE a User
    await User.findOneAndDelete({ _id: req.user.id });
    res.json({ msg: 'User was deleted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server ERROR!');
  }
});
//--------------END------------------------------------

//@route      PUT api/profile
//@desc       ADD profile EXPERIENCE
//@access     private
router.put(
  '/experience',
  [
    auth,
    [
      body('title').not().isEmpty().withMessage('Title is required'),
      body('company').not().isEmpty().withMessage('Skills are required'),
      body('from').not().isEmpty().withMessage('From date is required'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { title, company, location, from, to, current, description } =
      req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server ERROR!');
    }
  }
);
//--------------END------------------------------------

module.exports = router;
