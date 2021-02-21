//Import EXPRESS
const express = require('express');
//Create a router from express ROUTER

const router = express.Router();

//Import check and validationResult
const { check, validationResult } = require('express-validator/check');

//@description: route for REGISTER (create) a new USER
//@route information: POST => api/users
//@access: PUBLIC
router.post(
  '/',
  [
    check('name', 'Please check name and try again')
      .isLength({
        min: 6,
      })
      .isString(),
    check('email', 'Please check email and try again').isEmail(),
    check('password', 'Please check password and try again').isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('USERS route');
  }
);
module.exports = router;
