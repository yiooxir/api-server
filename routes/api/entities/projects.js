var router = require('express').Router();
var issues = require('./issues');

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

