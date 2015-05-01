var errors = require('../errors');

module.exports = function(req, res, next) {
    res.locals = {};
    res.locals.user = {user: 'me'};
    return next();
};
