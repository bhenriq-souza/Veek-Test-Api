const mysql = require('mysql');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'user',
    password: 'admin',
    database: 'api'
});

module.exports = connection;