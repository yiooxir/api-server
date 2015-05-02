process.env.NODE_ENV = 'test';
require('../../database/adapter');
var async = require('async');

var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.clear = function(callback) {
    console.log('clear database');
    var cols = mongoose.connection.collections;

    async.each(Object.keys(cols), function(col, next) {
        cols[col].remove(next);
    }, callback);
};


module.exports = mongoose;


