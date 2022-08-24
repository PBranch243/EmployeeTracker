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
const employeeQuery = `SELECT employees.id, employees.first_name, employees.last_name, roll.salary, roll.title, department.name AS department, employees.manager_id
FROM employees
LEFT JOIN roll ON employees.roll_id = roll.id
LEFT JOIN department ON roll.department_id = department.id;`
function allEmployees() {
    db.query(employeeQuery, (err, rows) => {
        if (err) {
            console.log(err);
        }
        // console.log(`query OK`);
        console.table(rows);
    });

};

allEmployees();

// start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
