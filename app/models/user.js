var crypto = require('crypto');
var async = require('async');
var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    rights: {},
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


User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};


User.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


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

module.exports = mongoose.model('User', User);

