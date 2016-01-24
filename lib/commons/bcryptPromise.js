'use strict';

var bcrypt = require('bcrypt-nodejs');

var Promise = require('./promiseConfig');

module.exports = {
    hash: function (data) {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(data, null, null, function (error, hash) {
                if (error) {
                    reject(error);
                } else {
                    resolve(hash);
                }
            });
        });
    },
    compare: Promise.promisify(bcrypt.compare)
};
