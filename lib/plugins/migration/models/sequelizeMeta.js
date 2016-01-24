
'use strict';

/**
 * Sequelize model template for SequelizeMeta Table
 * @param sequelize {Object} - Sequelize Object
 * @param DataTypes {Object} - DataTypes for Sequelize Object
 * @returns {Object} Sequelize Model Object Definition
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('SequelizeMeta', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // table name that will appear in postgres
        tableName: 'sequelize_meta'
    });
};
