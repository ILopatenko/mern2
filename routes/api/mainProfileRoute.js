//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
router.use('/me', require('./profile/getProfileCurrentUser'));
router.use('/cu', require('./profile/createUpdate'));
router.use('/all', require('./profile/getAll'));
router.use('/user', require('./profile/getByID'));
router.use('/del', require('./profile/deleteUser'));
module.exports = router;
