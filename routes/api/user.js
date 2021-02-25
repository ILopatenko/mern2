//Import EXPRESS
const express = require("express");

//Import EXPRESS ROUTER
const router = express.Router();

//////////////// START_ROUT /////////////////

router.use("/registration", require("./user/registration"));
router.use("/login", require("./user/login"));
////////////////// END_ROUT /////////////////

module.exports = router;
