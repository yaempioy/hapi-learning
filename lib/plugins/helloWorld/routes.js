'use strict';

var handler = require('./handlers');

module.exports = [
    {
        method: 'GET',
        path: '/{yourname*}',
        config: handler.helloYourname
    }
];
