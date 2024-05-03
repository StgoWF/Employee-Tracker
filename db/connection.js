const mysql = require('mysql2');

// Establece una conexión persistente
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'stgowf',
    password: 'Stgo1245',
    database: 'employee_tracker'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.message);
        return;
    }
    console.log('Connected to the database with id ' + db.threadId);
});

module.exports = db;
