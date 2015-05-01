var express = require('express');
var http = require('http');
var database = require('./database/adapter');
var routes = require('./routes');
var config = require('config').get('server');
var bodyParser = require('body-parser');
var errors = require('./errors');
var setCurUser = require('./middleware/currentUser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* middleware. */

/* set current user */
app.use(setCurUser);

/* set current team */
app.all('/:id/*', require('./middleware/currentTeam'));


/* api route entry point */

app.use('/api', routes);


/* 404 route note found */

app.use(function(req, res, next) {
    return next(errors.routNotFound());
});


/* error handler */

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json(err);
});


/* create server */

http.createServer(app).listen(config.port, function() {
    console.log('[Server]: start server on port ', config.port);
});

module.exports = app;
