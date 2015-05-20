var mongoose = require('mongoose');

var Rule = mongoose.Schema({
    name: String,
    entity: { type: String, required: true },
    value: { type: String, required: true },
    rights: { type: Number, default: 1 }
});

module.exports = mongoose.model('rule', Rule);