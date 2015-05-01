var errors = require('../errors');
var Team = require('../app/models/team');

module.exports = function(req, res, next) {
    console.log('>>',res.locals);

    if (!res.locals) return next(errors.serverError('res.locals not specified'));

    res.locals.team = {a:1};
    next();
};
