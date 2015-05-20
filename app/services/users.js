
function Users() {}

Users.prototype = {
    _getTeamOptions: function(user, team, callback) {},
    isSuperuser: function(user, team, callback) {},
    assignRootAccess: function(user, team, callback) {},
    removeRootAccess: function(user, team, callback) {},
    setSpecUsername: function(user, team, callback) {},
    addToGroup: function(user, group, callback) {},
    deleteFromGroup: function(user, group, callback) {},
    assignRole: function(user, role, callback) {},
    removeRole: function(user, role, callback) {},
    addRules: function(user, rules, callback) {},
    removeRules: function(user, rules, callback) {},
    /**
     * type: method
     * @description: change password from user.
     * @param user {object}
     * @param newPass {string}
     * @param callback {fn}
     * @return {object} user
     */
    changePassword: function(user, newPass, callback) {},
    dropAllRules: function(user, callback) {},
    checkPermission: function(user, object, callback) {}


};
