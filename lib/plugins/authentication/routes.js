/**
 * Created by kitti on 1/16/16.
 */
'use strict';

var handler = require('./handlers');

module.exports = [
    {
        method: 'GET',
        path: '/',
        config: handler.helloworld
    }
];