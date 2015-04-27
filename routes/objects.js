var express = require('express');
var router = express.Router();

var dba = require('../api/dba').dba;

router.get('/', dba.objectsQuery);

module.exports = router;
