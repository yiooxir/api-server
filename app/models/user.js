var crypto = require('crypto');
var async = require('async');
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var errors = require('../../errors');
var Team = require('./team');
var _ = require('underscore');
var logger = require('../../utils/logger');

/**
 * @description
 * User schema
 *
 * @class User
 * @extends BaseEntity
 */

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    rights: {
        type: Array,
        default: []
    },
    teams: {
        type: Array,
        default: []
    },
    isSuperUser: {
        type: Boolean,
        default: false
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

User.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.hashedPassword;
    delete obj.salt;
    return obj;
};

User.virtual('password')
    .set(function(password) {
        if (!password) return errors.badRequest('empty password');

        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};


User.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

User.statics.authorize = function(username, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (user && user.checkPassword(password)) {
                callback(null, user);
            } else {
                callback(new AuthError("wrong username or password"));
            }

        }
    ], callback);
};

/**
 * @description
 * Get rights about user in team by team name
 * @method checkTeamByName
 * @param teamName {string}
 * @return {object} rights of current user in team
 */
User.method.checkTeamByName = function(teamName) {

};

/**
 * @description
 * Get rights about user in team by team id
 * @method checkTeamById
 * @param teamId {string} team id
 * @return {object} rights of current user in team
 */
User.method.checkTeamById = function(teamId) {

};

/**
 * @async
 * @method shareTeam
 * @description
 * Share specify team for current user.
 * This will ensure the user's access to the team's entities.
 *
 * usage
 * -----
 * If you have not defined a property config.teamId, method raise the error *team ID is undefined*
 * TeamId can be both string or object instantiate of mongo's ObjectID class
 *
 * If you have not defined a property config.username it will be equal default username User.username
 *
 * A property config.superuser = false by default
 *
 *
 * config
 * ------
 * the config argument object supports the following properties:
 *
 * * teamId {string|object *instanceOf ObjectID* } the teams's ID which will be shared to the user
 * * username {string}  the users's nikname to be displayed in this command
 * * superuser {boolean} it ensure the superuser rights to the user in shared team
 *
 * callback
 * --------
 * the callback function get the one argument, containing the hash of the team rights. *See config prop.*
 *
 * @param config {object}
 * @param callback {object}
 */
User.methods.shareTeam = function(config, callback) {
    var self = this;

    var conf = {
        teamId: null,
        username: self.username,
        superuser: false
    };

    _.extend(conf, config);

    if (!config.hasOwnProperty('teamId')) callback(new Error('team ID is undefined'));

    if (config.teamId instanceof mongoose.Types.ObjectId) conf.teamId = config.teamId.toString();

    if (!mongoose.Types.ObjectId.isValid(conf.teamId)) callback(new Error('team ID is not valid'));

    async.waterfall([
        function(callback) {
            Team.findById(conf.teamId, callback)
        },
        function(res, callback) {
            if (!res) callback(new Error('team not found'));
            var share = _.findWhere(self.teams, {teamId: conf.teamId});
            if (share) {
                _.extend(share, conf);
            } else {
                self.teams.push(conf);
            }
            self.save(callback);
        },
        function(a,b, callback){
            callback(conf);
        }
    ], callback)
};

/**
 * @async
 * @method unshareTeam
 * @description
 * Unshare team for current user.
 * Attribute **teamId** may be string or object instantiated from mongo ObjectID
 *
 * If requested teamId will be not found in shared teams, it not throw the error, but logger send warn message.
 *
 * Callback get attributes: *err, res*, then *res* is all shared teams of current user.
 *
 * @param teamId {string | object}
 * @param callback
 * @returns {*}
 */
User.methods.unshareTeam = function(teamId, callback) {
    var self = this;

    if (teamId instanceof mongoose.Types.ObjectId) teamId = teamId.toString();

    var i = _.findIndex(self.teams, {teamId: teamId});

    if (i == -1) {
        logger.warn('the requested command is not found in the list of shared teams');
        return callback(null, self.teams);
    }

    self.teams.splice(i, 1);

    self.save(function(err, res) {
        if (err) return callback(err);
        return callback(null, self.teams);
    })
};

User.statics.addRights = function() {};

User.statics.deleteRights = function() {};

module.exports = mongoose.model('User', User);

