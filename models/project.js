var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
   name: {
       type: String,
       unique: true,
       required: true
   }
});

exports.Project = mongoose.model('Project', schema);
