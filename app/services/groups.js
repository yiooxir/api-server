var _ = require('underscore');

function Groups() {}

Groups.prototype = {
    get: function(group, callback) {
        /* получить конкретную группу */
    },
    query: function(options, callback) {
        /* выбрать группы на основании options */
    },
    create: function(name, team, options, callback) {
        /* создать группу. */
    },
    delete: function(group, callback) {
        /* удалить группу
        * а также убрать все правила у юзеров, которые связаны с группой */
    },
    update: function(group, vaules, callback) {
        /* обновить поля группы. установить здесь список полей, которые можно менять через этот метод.
        * на данный момент только name */
    },
    getUsers: function(group, callback) {
        /* получить всех пользователей группы */
    },
    addRole: function(group, role, callback) {
        /* прикрепить к группе роль */
    },
    removeRole: function(group, role, callback) {
        /* удалить роль из группы
        * также очистить все правила у пользвателей связанные с данной ролью, которые были
        * назначены через данную группу. */
    }
};

return new Groups();
