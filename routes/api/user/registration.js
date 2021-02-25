//Import EXPRESS
const express = require("express");
//Import EXPRESS ROUTER
const router = express.Router();
//Import check and validationResult to work with data from REQUEST
const { check, validationResult } = require("express-validator");
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    res.send(req.body);
  }
);
module.exports = router;
