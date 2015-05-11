var locals = require('./locals');
var _ = require('underscore');
var mongoose = require('mongoose');
var toId = require('../utils').toId;

function LowApi() {
    this.locals = locals;
}

LowApi.prototype = {

    _getTeamOptions: function(user, team, callback) {
        try {
            var e = _.findWhere(user.teams, {teamId: team._id.toString()});
        } catch (err) {
            return callback(err);
        }
        callback(null, e);
    },

    _expandRights: function(n, callback) {
        return callback(null, {
            GET: n > 0,
            PUT: n > 1,
            POST: n > 2,
            DELETE: n > 3
        });
    },

    isSuperuser: function(user, team, callback) {
        this._getTeamOptions(user, team, function(err, team) {
            if (err) return callback(err);
            callback(null, team ? team.superuser : undefined);
        });
    },

    getTeamName: function(user, team, callback) {
        this._getTeamOptions(user, team, function(err, team) {
            if (err) return callback(err);
            callback(null, team ? team.username : undefined);
        });
    },

    _objectRules: function(user, object, callback) {
        try {
            var e = _.where(user.rights, {entity: object._title});
        } catch (err) {
            return callback(err);
        }
        callback(null, e);
    },

    getObjectRights: function(user, object, callback) {
        var self = this;
        self._objectRules(user, object, function(err, rules) {
            if (err) return callback(err);

            var res = 0;

            _.each(rules, function(r) {
                if (object[r.field] == r.value) res = r.right;
            });

            self._expandRights(res, callback);
        })
    },

    checkObjectRights: function(user, object, type, callback) {
        this.getObjectRights(user, object, function(err, res) {
            if (err) return callback(err);
            callback(null, res[type]);
        })
    },

    convertToDbQuery: function(values, callback) {

    },

    setRule: function(user, rule, callback) {
        rule.id = mongoose.Types.ObjectId().toString();
        user.rights.push(rule);
        user.save(callback);

    },

    deleteRule: function(user, rule, callback) {
        var i = _.findIndex(user.rights, {id: toId(rule)});

        if (i != -1) {
            user.rights.splice(i,1);
            user.save(function(err) {
                if (err) return callback(err);
                callback(null, i);
            });
        } else {
            callback(null, i);
        }
    }

};

module.exports = new LowApi();
