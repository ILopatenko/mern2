//Import EXPRESS
const express = require('express');

//Create a router from express ROUTER
const router = express.Router();

//@description: Create a test route with ROUTER
//@route information: GET to api/posts
//@access: PUBLIC
router.get('/', (req, res) => res.send('POSTS route'));

module.exports = router;
