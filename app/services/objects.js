function Objects() {}

Objects.prototype =  {
    getRights: function(user, object) {
        // проверить права на объект у полученного пользователя
        // здесь можно получить права на объект в развернутом виде.
    },
    checkPermission: function(user, object, type) {

    },
    get: function() {
        // здесь можно подключать доп. функции на проверку и изменение зависимостей
    },
    query: function() {
        // здесь можно подключить доп. функции для расширения полученных объектов
    },
    update: function() {
        // здесь можно подключать доп. функции на проверку и изменение зависимостей
    },
    delete: function() {
        // здесь можно подключать доп. функции на проверку и изменение зависимостей
    }
};