var express = require('express');
var router = express.Router();
var users = require('../app/controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users list');
});

router.get('/:id', function(req, res) {
  res.send('About user: ' + req.params.id);
});

router.post('/', users.create);

module.exports = router;
