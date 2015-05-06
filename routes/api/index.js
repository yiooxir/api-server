var express = require('express');
var teams = require('./teams');
var auth = require('./auth');
//var user = require('../app/controllers/users');
var router = express.Router();


/* Teams route */

router.use('/teams', teams);
router.use('/auth', auth);


module.exports = router;
