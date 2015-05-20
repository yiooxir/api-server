
function Users() {}

Users.prototype = {
    _getTeamOptions: function(user, team, callback) {
        /* вернуть опции пользователя для указанной команды
        * опции храняться в свойтсве user.teams */
    },
    _addRules: function(user, rules, callback) {
        /* добавить правила пользователю. */
    },
    _removeRules: function(user, rules, callback) {
        /* удалить правила у пользователя */
    },
    isSuperuser: function(user, team, callback) {
        /* проверить юзера на права суперпользователя в указанной команде */
    },
    assignRootAccess: function(user, team, callback) {
        /* установить права суперпользователя у пользователя в команде*/
    },
    removeRootAccess: function(user, team, callback) {
        /* удалить права суперпользователя у указанного пользователя в указанной команде */
    },
    setSpecUsername: function(user, team, callback) {
        /* установить для пользователя специальное имя в указанной команде. */
    },
    addToGroup: function(user, group, callback) {
        /* добавить пользователя в группу
        * также добавить все роли и правила с ними связанные */
    },
    removeFromGroup: function(user, group, callback) {
        /* удалить пользователя из группы
        * также снимаются все роли и правила, с ней связанные */
    },
    assignRole: function(user, role, callback) {
        /* назначить определенную роль и скопировать все правила с ней связанные */
    },
    removeRole: function(user, role, callback) {
       /* удалить роль и все правила с ней связанные*/
    },

    /**
     * type: method
     * @description: change password from user.
     * @param user {object}
     * @param newPass {string}
     * @param callback {fn}
     * @return {object} user
     */
    changePassword: function(user, newPass, callback) {
        /* изменить пароль у пользователя */
    },
    dropAllRules: function(user, callback) {
        /* удалить все правила. */
    }


};
