var express = require('express');
var teams = require('./teams');
var router = express.Router();

// Teams route
router.use('/teams', teams);

module.exports = router;