const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

/* //@route      GET api/user
//@desc       Test route
//@access     Public
router.get('/', (req, res) => res.send('User route')); */

//@route      POST api/user
//@desc       Register a new user
//@access     Public
router.post(
  '/',
  [
    body('name')
      .isString()
      .withMessage('Name should be a text')
      .not()
      .isEmpty()
      .withMessage('Name can not be an empty'),
    body('email')
      .isEmail()
      .withMessage('Email should an email')
      .not()
      .isEmpty()
      .withMessage('Email can not be an empty'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password should be at least 6 characters length'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send('User route');
  }
);

module.exports = router;
