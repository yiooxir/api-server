var User = require('../models/user');

exports.create = function(req, res, next) {
    console.log(req.body);
    console.log(req.params);

    res.end('Ok');
};
