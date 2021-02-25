//Import EXPRESS
const express = require("express");

//Import EXPRESS ROUTER
const router = express.Router();

router.get("/login", (req, res) => {
  res.send("hello from api/user/login");
});

router.get("/", (req, res) => {
  res.send("hello from api/user");
});

module.exports = router;
