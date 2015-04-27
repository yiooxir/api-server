var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Objects list');
});

router.get('/:id', function(req, res) {
  res.send('About object: ' + req.params.id);
});

module.exports = router;