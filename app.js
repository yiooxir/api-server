var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('./lib/mongoose');
var MongoStore = require('connect-mongostore')(session);
var routes = require('./routes');
//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.get('session.secret'),
  key: config.get('session.key'),
  cookie: config.get('session.cookie'),
  store: new MongoStore({'db': mongoose.connections[0].name}),
  resave: false,
  saveUninitialized: true
}));



function setCurrentUrl(req, res, next) {
  //console.log('>>')
  app.set('CURRENT_URL', req.protocol + '://' + req.get('host') + req.originalUrl);

  app.set('COLLECTION')
  //res.locals = {};
  //res.locals.collection = req.originalUrl.splice(1, req.originalUrl.length-1);
  //app.set('COLLECTION', res.locals.collection);
  //console.log(app.get('CURRENT_URL'));
  next();
}

app.use(setCurrentUrl);

routes(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = config.get('port');
http.createServer(app).listen(port, function() {
  console.log('start server on port ', port);
});

module.exports = app;
