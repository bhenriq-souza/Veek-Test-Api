module.exports = {
    "up": "CREATE TABLE user ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(50), created DATETIME DEFAULT CURRENT_TIMESTAMP);",
    "down": "DROP TABLE user"
}