const pool = require('../../config/database/index');

async function InsertUser (user) { 
    try {
        if(user) {
            let conn = await pool.getConnection();
            let query = `INSERT user VALUES(0,'${user.name}','${user.email}', CURDATE())`;
            let result = await conn.query(query);
            conn.end();
            return true;
        }
    } catch (err) {
        throw new Error(err);
    }     
}

const UserService = {
    insertUser: InsertUser
}

module.exports = UserService;