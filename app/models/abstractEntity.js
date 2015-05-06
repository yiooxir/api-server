var mongoose = require('mongoose');

/**
 * @class BaseEntity
 */
var entity = mongoose.Schema({
        _createdBy: {type: Object},
        _createdOn: {type: Date, default: new Date().getTime()},
        _updatedOn: {type: Date, default: new Date().getTime()},
        _rights: {type: Array},
        _teams: {type: Array}
    },
    {
        discriminatorKey : '_title'
    });

/**
 * @method aaa
 * @description
 * base class
 *
 * @param a
 */
entity.methods.aaa = function(a) {console.log(this)};


module.exports = entity;