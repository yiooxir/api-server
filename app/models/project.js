var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    name:         { type: String, unique: true, required: true },
    issuePrefix:  { type: String, required: true },
});

module.exports = mongoose.model('Project', Project);
