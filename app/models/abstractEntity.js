var mongoose = require('mongoose');
var _ = require('underscore');

/**
 * @class BaseEntity
 */
var entity = mongoose.Schema({
        _createdBy: {type: Object},
        _createdOn: {type: Date, default: new Date().getTime()},
        _updatedOn: {type: Date, default: new Date().getTime()},
        _rights: {type: Array},
        _teams: {type: Array},
        _parent: {type: Object}
    },
    {
        discriminatorKey : '_title'
    });

entity.methods.setRights = function(user, rights, callback) {
    var self = this;

    // 1 есть ли такое правило уже
    var rule = _.findWhere(user.rights, {id: self._id.toString()});

    if (rule) {
        rule.rights = rights;
    } else {
        rule = {
            entity: self._title,
            id: self._id.toString(),
            rights: rights
        };

        user.rights.push(rule);
    }

    user.save(function(err) {
        if (err) return callback(err);
        return callback(null, user.rights);
    });
};


module.exports = entity;