// Import the mysql2 package to use MySQL features in Node.js
const mysql = require('mysql2');

// Create a connection object with the MySQL database details
const db = mysql.createConnection({
    host: 'localhost', // The hostname of the database server, or IP address if not local
    user: 'stgowf', // The username for database access
    password: 'Stgo1245', // The password for the database user
    database: 'employee_tracker' // The name of the database to connect to
});

// Attempt to connect to the database
db.connect(err => {
    if (err) {
        // If there is an error in connection, log it to the console
        console.error('Error connecting: ' + err.stack);
        return;
    }
    // If connection is successful, log the connection ID
    console.log('Connected as id ' + db.threadId);
});

// Export the connection object so it can be used elsewhere in the application
module.exports = db;
