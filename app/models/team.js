var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Team schema
var Team = new Schema({
	name: 		  { type: String, required: true  },
	description:  { type: String, required: false }
});

module.exports = mongoose.model('Team', Team);