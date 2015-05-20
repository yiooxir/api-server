var mongoose = require('mongoose');

var Groups = mongoose.Schema({
    name: 		  {
        type: String,
        required: true,
        unique: true
    },
    description:  {
        type: String
    },
    team: {
        type: String
    },
    users: {
        type: Array
    },
    role: {
        type: String,
        ref: 'role'
    }
});

module.exports = mongoose.model('groups', Groups);
