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

http.createServer(app).listen(config.port, function() {
    console.log('[Server]: start server on port ', config.port);
});

module.exports = app;
