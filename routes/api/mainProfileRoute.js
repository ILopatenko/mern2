//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
router.use('/me', require('./profile/getProfileCurrentUser'));
router.use('/cu', require('./profile/createUpdate'));
module.exports = router;
