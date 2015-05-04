var User = require('../models/user');
var Team = require('../models/team');
var errors = require('../../errors');


exports.query = function(req, res, next) {
    res.json('users')
};

exports.get = function(req, res, next) {
    res.json('user')
};

/**
 * @description:
 * create team, user; make user as team's superuser
 */
exports.create = function(req, res) {


    async.waterfall([
        function(callback) {
            var team = new Team(req.body);
            team.save(callback);
        },
        function(team, callback) {
            callback();
        }
    ], function() {
        res.json('fuck');
    });

    console.log(req.body);
    console.log(res.locals);

    res.json(res.locals);
};

exports.update = function(req, res, next) {

};

exports.delete = function(req, res, next) {

};
