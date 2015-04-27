var Project = require('../models/project').Project;

var dba = null;

module.exports = {
    dba: dba,
    init: function() {
        if (!dba) return new DatabaseEngineApi(arguments);
        return dba;
    }
};

function DatabaseEngineApi() {
    this.queryType = null;
    this.user = null;
}

DatabaseEngineApi.prototype = {
    projectCreate: function(req, res, next) {
        return res.json('create user');
    },
    projectUpdate: function(req, res) {

    },

    userGet: function() {},
    usersQuery: function() {},
    userCreate: function() {},
    userUpdate: function() {},
    userDelete: function() {},
    userAddToGroup: function() {},
    userDeleteFromGroup: function() {},

    objectsGet: function() {},
    objectsQuery: function() {},
    objectsUpdate: function() {},
    objectsDelete: function() {},
    objectsAddToGroup: function() {}
};
