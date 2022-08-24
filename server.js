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
function allEmployees() {
    const employeeQuery = `SELECT employees.id, employees.first_name, employees.last_name, roll.salary, roll.title, department.name AS department, employees.manager_id
FROM employees
LEFT JOIN roll ON employees.roll_id = roll.id
LEFT JOIN department ON roll.department_id = department.id;`
    db.query(employeeQuery, (err, rows) => {
        if (err) {
            console.log(err);
        }
        // console.log(`query OK`);
        console.table(rows);
    });

};

function allRolls(){
    const rollQuery= `SELECT roll.id, roll.title, department.name AS department, roll.salary
    FROM roll
    LEFT JOIN department ON roll.department_id = department.id;`;
    db.query(rollQuery, (err,rows)=>{
        if (err) {
            console.log(err);
        }
        // console.log(`query OK`);
        console.table(rows);
    });
};

function allDept(){
    const deptQuery= `SELECT * FROM department;`;
    db.query(deptQuery, (err,rows)=>{
        if (err) {
            console.log(err);
        }
        // console.log(`query OK`);
        console.table(rows);
    });
};

// function to add department.  pass info from inquirer prompt into 'name'
function addDept(){
    const name = `newDepartment`;
    const sql = `INSERT INTO department (name) VALUES (?);`;
    
    db.query(sql, name, (err, result)=>{
        if (err) {
            console.log(err);
            return;
          }
          console.log(result);
          allDept();
    });
};

function addRoll(){
    const params = ['newTitle', 1, 5];
    const rollsql = `INSERT INTO roll (title, salary, department_id) VALUES (?,?,?);`;
    
    db.query(rollsql, params, (err, result)=>{
        if (err) {
            console.log(err);
            return;
          }
          console.log(result);
          allRolls();
    });
};


function addEmployee(){
    const params = ['newFirst', 'newLast', null, null];
    const empsql = `INSERT INTO employees (first_name, last_name, roll_id, manager_id) VALUES (?,?,?,?);`;
    
    db.query(empsql, params, (err, result)=>{
        if (err) {
            console.log(err);
            return;
          }
          console.log(result);
          allEmployees();
    });
};

// addEmployee();
// addRoll();
// addDept();
// allEmployees();
// allRolls();
// allDept();

// start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
