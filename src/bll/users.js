const csv = require('csv');
const fs = require('fs');
const mysql = require('mysql');
const pool = require('../../config/database/index');
const User = require('../model/User');

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
    if(userId) {
        let query = "SELECT * FROM user WHERE id = ?;";
        let params = [];
        params.push(userId);
        executeQuery(query, params, callback);
    }    
}

/**
 * Delete user by id.
 * @param {Number} userId User id.
 * @callback Callback Request callback.
 */
function deleteUser (userId, callback) {
    if(userId) {
        // Search for the user in DB.
        let select = "SELECT * FROM user WHERE id = ?;"
        let params = [];
        params.push(userId);
        executeQuery(select, params, (error, result) => {
            if(error) callback(error);
            // If the user was found, execute the delete.
            if(result && result.length) {
                let query = "DELETE FROM user WHERE id = ?;";    
                executeQuery(query, params, callback);
            } else {
                callback(new Error('User not found'));
            }
        });
    }    
}

/**
 * Update user by id.
 * @param {Number} userId User id.
 * @callback Callback Request callback.
 */
function updateUser (user, callback) {
    if(user) {
        // Search for the user in DB.
        let select = "SELECT * FROM user WHERE id = ?;"  
        executeQuery(select, [user.id], (error, result) => {
            if(error) callback(error);
            // If the user was found, execute the update.
            if(result && result.length) {
                let query = "UPDATE user SET name = ?, email = ? WHERE id = ?;";
                let updtParams = [];
                updtParams.push(user.name);
                updtParams.push(user.email);
                updtParams.push(user.id);
                executeQuery(query, updtParams, callback);
            } else {
                callback(new Error('User not found'));
            }
        });
    }
}

/**
 * Insert users from file uploaded.
 * @param {Object} file File received
 * @callback Callback Request callback.
 */
function insertUserFromFile (file, callback) {
    fs.createReadStream(file.path).pipe(createParser(';', file, callback));
}

/**
 * Create parser to be used in file reading.
 * @param {String} delimiter Limiting string
 * @param {Object} file File received
 * @callback Callback Request callback.
 */
function createParser(delimiter, file, callback) {
    return csv.parse({ delimiter: delimiter }, (err, data) => {        
        let errors = [];
        data.forEach(element => {
            let user = new User(...element);
            insertUser(user, (error, result, fields) => {
                if(error) {
                    let err = {};
                    err.message = err;
                    err.user = user.name;
                    errors.push(err);
                }          
            });
        });
        if(errors && errors.length) {
            fs.unlink(file.path);
            callback(errors, `${errors.length} failed.`);
        }
        fs.unlink(file.path);
        callback(null, `${data.length} users added successfully.`);
    });
}

const userService = {
    insertUser: insertUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    deleteUser: deleteUser,
    updateUser: updateUser,
    insertUserFromFile: insertUserFromFile
}

module.exports = userService;