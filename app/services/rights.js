/**
 * Created by sergey on 19.05.15.
 */

function Rights() {}

Rights.prototype = {
    _expand: function(n) {
        /* расширить цифру прав на хэш правил
        * вместо цифры дает расшифровку {read: true, write: true ... }*/
    },
    get: function(user, object, callback) {
        /* получить все права на объект. */
    },
    permitted: function(user, object, type, callback) {
        /* проверить права на объект по указнному типу запроса. */
    },
    toQuery: function(user, entity) {
        /* перевести правила пользователя на указанные объекты в запрос к бд */
    }
};


validators = {
    issue: [
        function() {}
    ]
};