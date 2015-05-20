/**
 * Created by sergey on 19.05.15.
 */

function Permissions() {}

Permissions.prototype = {
    expand: function(n) {},
    getRights: function(user, object) {},
    isPermitted: function(user, object) {},
    makeQparams: function(params) {},
    makeQrights: function(rules, entity) {}

    /*User.permissions[{ entity: project, field: _parent, value: 123 }]
    *
    * issues   User.permissions[{entity: 'issue', field: _parent, value: 123}]
    * Issue.find({_parent$in: [123, ...], (обязательное)teamId: ..., (из доп query)projectId: ...})
    * */
};