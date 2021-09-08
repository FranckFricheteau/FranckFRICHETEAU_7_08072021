//*********************************************
// connection to mySQL
const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'groupomania'
});

// Connection 
db.connect((err) => {
    if (err) {
        console.log("connection to MySQL failed");
        throw err;
    }
    console.log('All is under controle =) connection to MySQL success !');
});

module.exports = db;