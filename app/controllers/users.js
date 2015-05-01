var User = require('../models/user');



exports.query = function(req, res, next) {
    res.json('users')
};

exports.get = function(req, res, next) {
    res.json('user')
};

exports.create = function(req, res) {
    console.log(req.body);
    console.log(res.locals);

    res.json(res.locals);
};

exports.update = function(req, res, next) {

};

exports.delete = function(req, res, next) {

};
