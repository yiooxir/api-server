

function Locals() {
    this.user = null;
    this.team = null;
    this.parent = null;
    this.entity = null;
}

Locals.prototype = {
    getCurrentUser: function() {
        return this.user
    },
    setCurrentUser: function(user) {
        this.user = user
    },
    getCurrentTeam: function() {
        return this.team;
    },
    setCurrentTeam: function(team) {
        this.team = team;
    },
    getParentEntityName: function() {
        return this.parent;
    },
    setParentEntityName: function(name) {
        this.parent = name;
    },
    getCurrentEntityName: function() {
        return this.entity;
    },
    setCurrentEntityName: function(name) {
        this.entity = name;
    }
};

module.exports = new Locals();