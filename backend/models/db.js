//*********************************************
// connection to mySQL
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Azerty123,',
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