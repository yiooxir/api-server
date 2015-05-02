var users = require('./users');
var projects = require('./projects');
var router = require('express').Router();


/* entity routing */
router.use('/users', users);
router.use('/projects', projects);

module.exports = router;
