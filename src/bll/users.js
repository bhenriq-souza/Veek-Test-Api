const mysql = require('mysql');
const pool = require('../../config/database/index');

/**
 * Execute generic query with parameters.
 * @param {String} query 
 * @param {Array} params
 */
function executeQuery (query, params, callback) {
    try {
        pool.getConnection( (error, connection) => {
            if(error) {
                throw new Error(error);
            }
            if(params && params.length) {
                query = mysql.format(query, params);
            }
            connection.query(query, callback);
            connection.release();            
        });
    } catch (error) {
        callback(error);
    }
}

/**
 * Insert new user.
 * @param {Object} user
 */
function insertUser (user, callback) { 
    if(user) {
        let query = 'INSERT user VALUES(0, ?, ?, CURDATE());';
        let params = [];
        params.push(user.name);
        params.push(user.email);
        executeQuery(query, params, callback);
    }      
}

/**
 * Get all users
 */
function getAllUsers (callback) {
    let query = "SELECT * FROM user;";
    executeQuery(query, null, callback);
}

const userService = {
    insertUser: insertUser,
    getAllUsers: getAllUsers
}

module.exports = userService;