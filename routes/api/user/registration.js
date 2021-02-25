//Import EXPRESS
const express = require("express");
//Import EXPRESS ROUTER
const router = express.Router();
//Import check and validationResult to work with data from REQUEST
const { check, validationResult } = require("express-validator");
//Import User model
const User = require("../../../models/User");
//Import gravatar
const gravatar = require("gravatar");
//Import BCRYPT
const bcrypt = require("bcryptjs");
router.post(
  "/",
  [
    check("name", "Check NAME and try again")
      .trim()
      .not()
      .isBoolean()
      .isLength({ min: 6 }),
    check("email", "Check EMAIL and try again").trim().isEmail(),
    check("password", "Check PASSWORD and try again")
      .trim()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //REGISTRATION ROUTE LOGIC
    //Check if user (with email from req.body.email) exists in DATABASE
    //(if exists - send status code and message if does not - create a new USER)
    //DESTRUCTURING NAME, EMAIL and PASSWORD from request (req.body.name, req.body.email, req.body.password)
    const { name, email, password } = req.body;
    try {
      //Try to find USER with email from request in DATABASE
      let user = await User.findOne({ email });
      //If USER was found - return status code 400 with a message
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }
      //If USER was not found in DATABASE - create a new USER
      //Create an avatar for new USER with GRAVATAR
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      //Create a new instance of USER
      user = new User({ name, email, password, avatar });
      //Create SALT for making a HASH of PASSWORD
      const salt = await bcrypt.genSalt(10);
      //Change USER.PASSWORD from direct PASSWORD to a HASH of PASSWORD
      user.password = await bcrypt.hash(password, salt);
      //SAVE new USER
      await user.save();
      //Return a message
      res.send("User was registered");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error!");
    }
  }
);
module.exports = router;
