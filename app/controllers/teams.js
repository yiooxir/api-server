var Team = require('../models/team');

exports.get = function(req, res) {
	
}

exports.create = function(req, res) {
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
}