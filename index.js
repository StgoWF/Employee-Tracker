// Import necessary modules
const inquirer = require('inquirer');
const db = require('./db/database');

// Main menu function
function mainMenu() {
    console.log('\nEmployee Tracker Main Menu');
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit'
        ]
    }).then(answer => {
        switch (answer.action) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                db.end();
                console.log('Exiting Employee Tracker...');
                break;
            default:
                console.log('Invalid action!');
                mainMenu();
        }
    });
}

// Placeholder functions for each menu item
function viewDepartments() {
    console.log('Function to view all departments');
    // Implement SQL query to fetch and display departments
}

function viewRoles() {
    console.log('Function to view all roles');
    // Implement SQL query to fetch and display roles
}

function viewEmployees() {
    console.log('Function to view all employees');
    // Implement SQL query to fetch and display employees
}

function addDepartment() {
    console.log('Function to add a department');
    // Implement prompt and SQL query to add a new department
}

function addRole() {
    console.log('Function to add a role');
    // Implement prompt and SQL query to add a new role
}

function addEmployee() {
    console.log('Function to add an employee');
    // Implement prompt and SQL query to add a new employee
}

function updateEmployeeRole() {
    console.log('Function to update an employee role');
    // Implement prompt and SQL query to update an employee's role
}

// Initialize the application
mainMenu();
