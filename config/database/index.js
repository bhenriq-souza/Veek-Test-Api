const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'admin',
    database: 'api'
});

connection.connect( err => {
    if (err) throw err;
    console.log('DB Connected');
})

module.exports = connection;