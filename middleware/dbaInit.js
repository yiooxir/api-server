var dba = require('../api/dba');

module.exports = function(req, res, next) {
    dba.init(fn(err, dba) {
        if (err) next(err);
        next(dba);
    });
};
