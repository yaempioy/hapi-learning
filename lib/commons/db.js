'use strict';
// Configure database connection and the database models' path for "Sequelize"
var Sequelize = require('sequelize');
var glob = require('glob');
var _ = require('lodash');
var config = require('../../config/config');
var modelsPath = 'lib/plugins/*/models/*.js';

var db = new Sequelize(config.database.url, {
  define: {
    paranoid: true,
    underscored: true
  }
});

var globOptions = {
    nodir: true,
    strict: true,
    cwd: process.cwd()
};

var files = glob.sync(modelsPath, globOptions);

// register all models
_.forEach(files, function (file) {
    db.import(globOptions.cwd + '/' + file);
});

// register to many for each model
_.forEach(db.models, function (model) {
    // called associate method if any
    if ('associate' in model) {
        model.associate(db.models);
    }
});

module.exports = db;
