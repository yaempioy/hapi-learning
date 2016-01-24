## Sequelize Migrations

1. Install Sequelize Command Line Interface (Sequelize CLI) by type 'npm install -g sequelize-cli' for access to 'sequelize' anywhere on you system
2. Create .sequelizerc, flags and options for CLI   
3. Type 'sequelize migration:create --name your_migration_name', will generate migration file to compliant in '.sequelizerc' file.
4. Modify the models file the same way to reflect the same change as in migration files

* All models should be place in 'lib/plugins/*/models/your_model_name.js'

To see all definitions for 'sequelize-cli' please visit [sequelize-cli github](https://github.com/sequelize/cli)
