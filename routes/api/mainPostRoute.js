//Import EXPRESS
const express = require('express');
//Import EXPRESS ROUTER
const router = express.Router();
router.use('/new', require('./post/createNewPost'));
router.use('/all', require('./post/getAllPosts'));
router.use('/', require('./post/getORDelPostByID'));
module.exports = router;
