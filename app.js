var express = require('express');
var http = require('http');
var database = require('./database/adapter');
var routes = require('./routes');
var config = require('config').get('server');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

/* error handler */

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json(err);
});

http.createServer(app).listen(config.port, function() {
    console.log('[Server]: start server on port ', config.port);
});

module.exports = app;
