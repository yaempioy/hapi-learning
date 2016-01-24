'use strict';
module.exports = {
    up: function (queryInterface, DataTypes) {
        console.log('run migration');
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.createTable('users', { id: DataTypes.INTEGER });
         */
        var tableName = 'auth_user';
        return queryInterface.createTable(tableName, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            username: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
            first_name: {
                type: DataTypes.STRING
            },
            last_name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING(254)
            },
            is_superuser: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            last_login: {
                type: DataTypes.DATE
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deleted_at: {
                type: DataTypes.DATE
            }
        }).then(function () {

            var addUniqueComposite = queryInterface.sequelize.query(
                'ALTER TABLE auth_user ADD CONSTRAINT auth_user_username_key UNIQUE(username)'
            );

            var addIndexUsername = queryInterface.addIndex(tableName, {
                fields: ['username']
            });
            var addIndexDeletedAt = queryInterface.addIndex(tableName, {
                fields: ['deleted_at']
            });

            return [addUniqueComposite, addIndexUsername, addIndexDeletedAt];
        });
    },

    down: function (queryInterface, DataTypes) {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.dropTable('users');
         */
        return queryInterface.dropTable('auth_user');
    }
};
