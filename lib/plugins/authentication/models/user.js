'use strict';

var bcrypt = require('../../../commons/bcryptPromise');

/**
 * Hook to hash the password before create and update
 * @param instance {User} - instance of the user model
 * @param options
 * @returns {string} - hash password string
 */
var beforeSave = function (instance, options) {
    return bcrypt.hash(instance.password).then(function (hash) {
        instance.password = hash;
    });
};

/**
 * Sequelize model template for User table
 * @param sequelize {Object} - Sequelize Object
 * @param DataTypes {Object} - DataTypes for Sequelize Object
 * @returns {Object} Sequelize Model Object Definition
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        firstName: {
            type: DataTypes.STRING(30),
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(30),
            field: 'last_name'
        },
        email: {
            type: DataTypes.STRING(254),
            validate: {
                isEmail: true
            }
        },
        isSuperUser: {
            type: DataTypes.BOOLEAN,
            field: 'is_superuser',
            allowNull: false,
            defaultValue: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            field: 'is_admin',
            allowNull: false,
            defaultValue: false
        },
        lastLogin: {
            type: DataTypes.DATE,
            field: 'last_login',
            validate: {
                isDate: true
            }
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at',
            validate: {
                isDate: true
            }
        }
    }, {
        // add index to fields
        indexes: [
            {
                fields: ['username']
            },
            {
                fields: ['deleted_at']
            }
        ],

        // table name that will appear in postgres
        tableName: 'auth_user',

        // register event
        hooks: {
            beforeCreate: beforeSave,
            beforeUpdate: beforeSave
        },

        // instance method for this user model
        instanceMethods: {
            comparePassword: function (password) {
                return bcrypt.compare(password, this.password);
            }
        },

        // class method for this user model
        classMethods: {
            associate: function (models) {
                // specify relation with other models
            }
        }
    });
};
