//import express, mysql, inquirer, etc.
const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');
let choice;
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
        return start();
    });
    
};

function allRolls() {
    const rollQuery = `SELECT roll.id, roll.title, department.name AS department, roll.salary
    FROM roll
    LEFT JOIN department ON roll.department_id = department.id;`;
    db.query(rollQuery, (err, rows) => {
        if (err) {
            console.log(err);
        }
        // console.log(`query OK`);
        console.table(rows);
        start();
    });
};

function allDept() {
    const deptQuery = `SELECT * FROM department;`;
    db.query(deptQuery, (err, rows) => {
        if (err) {
            console.log(err);
        }
        // console.log(`query OK`);
        console.table(rows);
    });
};

// function to add department.  pass info from inquirer prompt into 'name'
function addDept() {
    const name = `newDepartment`;
    const sql = `INSERT INTO department (name) VALUES (?);`;

    db.query(sql, name, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        allDept();
    });
};

function addRoll() {
    const params = ['newTitle', 1, 5];
    const rollsql = `INSERT INTO roll (title, salary, department_id) VALUES (?,?,?);`;

    db.query(rollsql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        allRolls();
    });
};


function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },
        {
            type: 'input',
            name: 'roll_id',
            message: 'What is the employee role(enter a number)?'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'Please enter the employee managers id(if manager, enter 0)?'
        }
    ])
        .then((answers) => {

            const params = [answers.first_name, answers.last_name, answers.roll_id, answers.manager_id];
            const empsql = `INSERT INTO employees (first_name, last_name, roll_id, manager_id) VALUES (?,?,?,?);`;
            db.query(empsql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                // console.log(result);
                allEmployees();
                // start();
            });
            
        });


};




function updateEmployeeRoll() {
    const sql = `UPDATE employees SET roll_id = ? 
           WHERE id = ?`;
    const params = [1, 6];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        allEmployees();
    });
};


// inquirer script
function start() {


    inquirer.prompt(
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['1)View All Employees', '2)Add Employee', '3)Update Employee Role', '4)View all Roles', '5)Add Role', '6)View All Departments', '7)Add Department', '8)Exit']
        })
        .then((answer) => {
            choice = answer.choice;
            console.log(answer)
            if (choice == '8)Exit') {
                console.log(`Goodbye`);
                return;
            }
            else if (choice == '1)View All Employees') {
                console.log("Hit ME BABy One MORe TiME")
                return allEmployees();
            }
            else if (choice == '2)Add Employee') {
                return addEmployee();
            }
            else if (choice == '3)Update Employee Role') {
                return updateEmployeeRoll();
        
            }
            else if (choice == '4)View all Roles') {
                return allRolls();
        
            }
            else if (choice == '5)Add Role') {
                return addRoll();
        
            }
            else if (choice == '6)View All Departments') {
                allDept();
        
            }
            else if (choice == '7)Add Department') {
                return addDept();
        
            }
        });

        // console.log(choice);
    

};


start();
// updateEmployeeRoll();
// addEmployee();
// addRoll();
// addDept();
// allEmployees();
// allRolls();
// allDept();

// // start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

