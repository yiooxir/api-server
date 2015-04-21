/**
 * Created by sergey on 01.04.15.
 */

var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('mongoose.uri'), config.get('mongoose.options'));

module.exports = mongoose;
