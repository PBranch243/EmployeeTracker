DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

USE company;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

DROP TABLE IF EXISTS roll;
CREATE TABLE roll (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30), 
    salary DEC(10,2),
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roll_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (roll_id) REFERENCES roll(id) ON DELETE SET NULL
);