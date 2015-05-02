var errors = require('../errors');
var logger = require('../utils/logger');

module.exports = function(req, res, next) {
    res.locals = {};
    res.locals.user = {user: 'me'};
    return next();
};
