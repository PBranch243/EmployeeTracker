//import express
const express = require('express');
const mysql = require('mysql2');
// designate port and assign express() to the app
const PORT = process.env.PORT || 3001;
const app = express();
// add express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'A1-Branch3idinI',
        database: 'company'
    },
    console.log('Connected to the company database.')
);

//   database calls here
db.query(`SELECT * FROM employees`, (err, rows) => {
    if (err) {
        console.log(err);
    }
    console.table(rows);
});


// start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
