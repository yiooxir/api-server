
var url = require('url');
//var setUrl = require('setCurrentUrl');

module.exports = function(app) {


  //var collection = url.parse(app.get('CURRENT_URL')).pathname;

  app.get('/', function(req, res) {
    //console.log('current collection >>', collection);
    console.log('get');
    res.end('OK')
  });

  app.get('/:collection/:spec', function(req, res) {

    console.log('ggggggg', req.params.collection);
    res.end('get user');
  });


};
