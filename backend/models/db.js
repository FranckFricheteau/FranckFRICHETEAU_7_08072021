//*********************************************
// connection to mySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Azerty123,',
    database: 'groupomania',
});

connection.connect(function(error) {
    if (error) {
        console.log("connection to MySQL failed");
        throw error
    } else { console.log('All is under controle, success ! =)'); }
});