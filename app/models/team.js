var mongoose = require('mongoose');
var BaseSchema = require('./abstractEntity');
extend = require('mongoose-schema-extend');

/**
 * @class Team
 * @extends BaseEntity
 */
var Team = BaseSchema.extend({
	name: 		  { type: String, required: true, unique: true  },
	description:  { type: String, required: false }
});

module.exports = mongoose.model('team', Team);