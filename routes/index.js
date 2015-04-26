
var url = require('url');
var Dba = require('../api/Dba');

module.exports = function(app) {

  var dba = new Dba(app);

  app.post('api/projects', dba.projectCreate);
  //app.update('api/project/:id', dba.projectUpdate);
  //
  //app.get('api/:firm/users', dba.usersQuery);
  //app.get('api/:firm/users/:id', dba.userGet);
  //app.post('api/:firm/users/:id', dba.userCreate);
  //app.update('api/:firm/users/:id', dba.userUpdate);
  //app.delete('api/:firm/users/:id', dba.userDelete);
  //
  //app.get('/api/:firm/:collection', dba.objectsQuery);
  //app.post('/api/:firm/:collection/:id', dba.objectsGet);
  //app.update('/api/:firm/:collection/:id', dba.objectsUpdate);
  //app.delete('/api/:firm/:collection/:id', dba.objectsDelete);
};
