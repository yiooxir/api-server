var locals = require('./locals');
var _ = require('underscore');

function Secure() {
    this.locals = locals;
}

Secure.prototype = {
    /**
     * @method
     * @description
     * return rights for current user on the specified team
     *
     * @param user {object | id } user object
     * @param team { object | string }
     */
    isSuperuser: function(user, team) {
        return _.findIndex(user.teams, {teamId: team});

    },
    getTeamName: function(user, team) {

    },
    getObjectRights: function(user, object) {

    },
    getAllowedIds: function(team, user, parentCollectionName) {

    },
    checkObjectRights: function(object, type) {

    },
    convertToDbQuery: function(values) {

    }

};


