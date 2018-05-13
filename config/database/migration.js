const mysql = require('mysql');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'user',
    password: 'admin',
    database: 'api'
});

migration.init(connection, __dirname + '/migrations');