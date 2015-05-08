var locals = require('./locals');
var _ = require('underscore');

function Secure() {
    this.locals = locals;
}

Secure.prototype = {
    /**
     * @method
     * @description
     * return right for current user on the specified team
     *
     * @param user {object | id } user object
     * @optional
     * @param team { object | string }
     */
    getTeamRights: function(user, team) {
        user = arguments.length == 1 ? this.user : user;
        return _.findIndex(user.teams, {teamId: team});

    },
    getObjectRights: function(object) {

    },
    checkObjectRights: function(object, type) {

    },
    convertToDbQuery: function(values) {

    }

};


