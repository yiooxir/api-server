var express = require('express');
var user = require('../app/controllers/users');
var router = express.Router();


router.use('/signup', user.create);
//router.use('/auth/login', user.login);
//router.use('/auth/logout', user.logout);

module.exports = router;