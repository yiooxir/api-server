var Team = require('../models/team');

exports.get = function(req, res) {
	res.json('team object');
};

exports.query = function(req, res, next) {
	res.json('teams list');
};

exports.create = function(req, res, next) {
	var data = req.body;

	var team = new Team({
		name: data.name,
		description: data.description
	});

	team.save(function(err) {
		if (err) {
			console.log('err: ', err);
			return res.sendStatus(400)
		}
		res.send(team.toJSON());
	})
};


exports.update = function(req, res, next) {

};

exports.delete = function(req, res, next) {

};
