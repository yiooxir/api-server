var objectsRoute = require('./objects');
var usersRoute = require('./users');
var express = require('express');
var router = express.router;

router.use();

router.use('/objects', objectsRoute);
router.use('/users', usersRoute);

