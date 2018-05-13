const migration = require('mysql-migrations');
const connection = require('/index');

migration.init(connection, __dirname + '/migrations');