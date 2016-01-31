'use strict';

exports.helloYourname = {
    handler: function (request, reply) {
        reply('Hello ' + request.params.yourname + '!');
    }
};
