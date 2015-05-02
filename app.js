var express = require('express');
var http = require('http');
var database = require('./database/adapter');
var config = require('config').get('server');
var bodyParser = require('body-parser');
var errors = require('./errors');
var logger = require('./utils/logger');
//var setCurUser = require('./middleware/currentUser');
var apiRoute = require('./routes/api');
var authRoute = require('./routes/auth');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* ***********************/
/* M I D D L E W A R E
/* ***********************/

/* set current user */
//app.use(setCurUser);

/* set current team */
//app.all('/:id/*', require('./middleware/currentTeam'));


/* ***********************/
/* R O U T E S
/* ***********************/

/* api route entry point */
app.use('/api', apiRoute);

/* auth route entry point */
app.use('/auth', apiRoute);


/* ***********************/
/* E R R O R S
/* ***********************/

/* 404 route note found */
app.use(function(req, res, next) {
    return next(errors.routNotFound());
});

/* error handler */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json(err);
});


/* ***********************/
/* S E R V E R
/* ***********************/

/* create server */
http.createServer(app).listen(config.port, function() {
    logger.info('[Server]: start server on port:', config.port);
});

module.exports = app;
