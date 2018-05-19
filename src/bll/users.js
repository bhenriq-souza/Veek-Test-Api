const mysql = require('mysql');
const pool = require('../../config/database/index');

/**
 * Execute generic query with parameters.
 * @param {String} query Query to execute.
 * @param {Array} params Parameter, if exists.
 * @callback Callback Request callback.
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
 * @param {Object} user User to be inserted.
 * @callback Callback Request callback.
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
 * @callback Callback Request callback.
 */
function getAllUsers (callback) {
    let query = "SELECT * FROM user;";
    executeQuery(query, null, callback);
}

/**
 * Get user by id.
 * @param {Number} userId User id.
 * @callback Callback Request callback.
 */
function getUserById (userId, callback) {
    let query = "SELECT * FROM user WHERE id = ?;";
    let params = [];
    params.push(userId);
    executeQuery(query, params, callback);
}

const userService = {
    insertUser: insertUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById
}

module.exports = userService;