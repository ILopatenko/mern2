//Import EXPRESS
const express = require("express");

//Import EXPRESS ROUTER
const router = express.Router();

//////////// NAME of ROUTE ///////////////
// @route GET api/auth
// @descr TEST ROUTE
// @acess PUBLIC

router.get("/", (req, res) => {
  res.send("hello from api/post");
});

module.exports = router;
