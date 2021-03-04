//Import EXPRESS
const express = require('express');

//Import EXPRESS ROUTER
const router = express.Router();

router.use('/registration', require('./user/registration'));
router.use('/login', require('./user/login'));

module.exports = router;
