
var mongoose = require('mongoose');
var logger = require('../utils/logger');
var config   = require('config').get('database');


// This is singleton
module.exports = new Database();

function Database() {

    function connect() {
        // Config
        mongoose.connect(config.uri, config.options);
    }

    // Create connection
    connect();

    // Connection instance
    var db = mongoose.connection;

    // Callbacks
    db.on('error', function(err) {
        //console.log('[DB]: Connection error: ' + err.message);
        logger.error('[DB]: Connection error: ' + err.message);
    });


    db.once('open', function() {
        //console.log('[DB]: Connected to DB!');
        logger.info('[DB]: Connected to DB!');
    });

    db.on('disconnected', connect);



    // Return connection instance
    return mongoose.connection;
}
