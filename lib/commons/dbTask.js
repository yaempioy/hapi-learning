'use strict';
// Configure the migration process for 'Sequelize' using 'Umzug'
var Umzug = require('umzug');
var config = require('../../config/config');
var db = require('./db');

var umzug = new Umzug({
    storage: 'sequelize', // use database to store migration/seeder files
    storageOptions: {
        model: db.models.SequelizeMeta // use our custom SequelizeMeta model to create migration table in database
    },
    upName: 'up',
    downName: 'down',
    migrations: {
        params: [db.getQueryInterface(), db.constructor], // pass parameters to each migration files
        path: 'lib/migrations' // migration files' path
    }
});

module.exports = umzug;
