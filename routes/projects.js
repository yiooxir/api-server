var express = require('express');
var issues = require('./issues');
var router = express.Router();

/* GET projects listing. */
router.get('/', function(req, res, next) {
  res.send('Projects list');
});

router.get('/:id', function(req, res) {
  res.send('About project: ' + req.params.id);
});

// Objects route
router.use('/:id/issues', issues);

module.exports = router;

