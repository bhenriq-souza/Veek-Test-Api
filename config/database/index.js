const mysql = require('mysql');
const util = require('util');

const config = {
    host: 'localhost',
    user: 'user',
    password: 'admin',
    database: 'api'
};

const pool = mysql.createPool(config);

pool.query = util.promisify(pool.query);

module.exports = pool;