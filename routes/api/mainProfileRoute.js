//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
router.use('/me', require('./profile/getProfileCurrentUser'));
module.exports = router;
