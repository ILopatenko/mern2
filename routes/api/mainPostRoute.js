//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
router.use('/new', require('./post/createNewPost'));
module.exports = router;
