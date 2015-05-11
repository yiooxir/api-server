var mongoose = require('mongoose');
var BaseSchema = require('./abstractEntity');
extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

// Team schema
var Issue = BaseSchema.extend({
    name:         { type: String, required: true  },
    description:  { type: String, required: false }
});

module.exports = mongoose.model('issue', Issue);
