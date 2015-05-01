var express = require('express');
var teams = require('../app/controllers/teams');
var entities = require('./entities');


var router = express.Router();


/* entity route entry point */

router.use('/:id', entities);


/* team control */

router.get('/', teams.query);
router.get('/id', teams.get);
router.post('/', teams.create);
router.put('/', teams.update);
router.delete('/', teams.delete);




module.exports = router;
