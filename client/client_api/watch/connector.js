const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host : process.env.DB,
    user : process.env.DB_ID,
    password : process.env.DB_PASSWORD,
    database : 'defender2'
});

connection.getConnection();

module.exports = connection;
