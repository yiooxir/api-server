var _ = require('underscore');
var mongoose = require('mongoose');


exports.toId = function(value) {

    if (_.isObject(value)) {
        return value instanceof mongoose.Types.ObjectId ? value.toString() : value._id.toString();
    }
    return value;
};

exports.blanks = {
    rightRuleObject: {
        entity: null,
        field: null,
        value: null,
        method: 'is',
        right: 0
    },
    rightTeamObject: {
        teamId: null,
        superuser: false,
        username: false
    }
};