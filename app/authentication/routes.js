/**
 * Created by kitti on 1/16/16.
 */
'use strict';

module.exports = [
    {
        path: '/',
        method: 'GET',
        handler: function (request, reply) {
            reply('Hello World!!!');
        }
    }
];