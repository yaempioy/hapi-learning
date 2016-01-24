/**
 * Created by kitti on 1/16/16.
 */
'use strict';

var config = require('./config/config');
var db = require('./lib/commons/db');
var dbTask = require('./lib/commons/dbTask');

var serverOptions = {
  port: config.port,
  router: {
    isCaseSensitive: true, // determines whether '/example' and '/EXAMPLE' are considered different
    stripTrailingSlash: true // remove trailing slashes in incoming paths
  }
};

var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection(serverOptions);

server.register({
  register: require('hapi-router'),
  options: {
    routes: 'lib/plugins/**/*routes.js' // uses glob to include files
  }
}, function(err) {
  if (err) throw err;
});

dbTask.up().then(function(migrations) {
  console.log('Server Migrations', migrations);
  // try to check if any super user created yet?
  return db.models.User.findOrCreate({
    where: {
      username: 'codium',
      isSuperUser: true
    },
    defaults: {
      password: 'codium',
      isAdmin: true
    }
  });
}).all().spread(function(user, created) {

  server.start(function() {
    console.log('Server is running at:', server.info.uri);
  });
}).catch(function(error) {
  // sync database error
  console.error(error);
});
