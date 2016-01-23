/**
 * Created by kitti on 1/16/16.
 */
'use strict';

var config = require('./config/config');
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
        routes: 'lib/**/*routes.js' // uses glob to include files
    }
}, function (err) {
    if (err) throw err;
});

server.start(function () {
    console.log('Server is running at:', server.info.uri);
});
