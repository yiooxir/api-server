var errors = require('../errors');
var logger = require('../utils/logger');
var Team = require('../app/models/team');

module.exports = function(req, res, next) {
    logger.debug('>>',res.locals);

    if (!res.locals) return next(errors.serverError('res.locals not specified'));

    res.locals.team = {a:1};
    next();
};
