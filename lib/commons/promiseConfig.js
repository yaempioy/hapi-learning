'use strict';

var Promise = require('bluebird');

// throw error in reject to catch function
Promise.onPossiblyUnhandledRejection(function(error) {
  throw error;
});

module.exports = Promise;
