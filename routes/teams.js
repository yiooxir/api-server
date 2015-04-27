var express = require('express');
var users = require('./users');
var projects = require('./projects');
var objects = require('./objects');
var teams = require('../app/controllers/teams');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.send('Teams list');
});

router.post('/', teams.create);

router.get('/:id', function(req, res) {
  res.send('About team: ' + req.params.id);
});

// Users route
router.use('/:id/users', users);
// Projects route
router.use('/:id/projects', projects);
// Objects route
router.use('/:id/objects', objects);

module.exports = router;