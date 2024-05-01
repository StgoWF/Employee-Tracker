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

// Function to add a new department
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the new department?'
    }).then(answer => {
        const query = 'INSERT INTO departments (name) VALUES (?)';
        db.query(query, [answer.deptName], (err, results) => {
            if (err) {
                console.error('Error adding department: ' + err.message);
                return mainMenu();
            }
            console.log('Added new department successfully!');
            mainMenu();
        });
    });
}
// Function to view all departments
function viewDepartments() {
    const query = 'SELECT * FROM departments';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching departments: ' + err.message);
            return mainMenu();
        }
        console.table(results);
        mainMenu();
    });
}

// Function to add a new employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role ID for this employee?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the manager ID for this employee? (Enter NULL if no manager)'
        }
    ]).then(answer => {
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(query, [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, results) => {
            if (err) {
                console.error('Error adding employee: ' + err.message);
                return mainMenu();
            }
            console.log('Added new employee successfully!');
            mainMenu();
        });
    });
}
// Function to view all employees
function viewEmployees() {
    const query = 'SELECT * FROM employees';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employees: ' + err.message);
            return mainMenu();
        }
        console.table(results);
        mainMenu();
    });
}

// Function to update an employee's role
function updateEmployeeRole() {
    // Query the database to fetch all employees
    db.query('SELECT id, first_name, last_name FROM employees', (err, employees) => {
        if (err) {
            console.error('Error fetching employees: ' + err.message); // Log any errors if the query fails
            return mainMenu(); // Return to main menu if there's an error
        }
        // Map fetched employees to format suitable for inquirer choices
        const employeeChoices = employees.map(emp => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id
        }));

        // Prompt user to select an employee whose role is to be updated
        inquirer.prompt({
            type: 'list',
            name: 'employeeId',
            message: 'Which employee\'s role would you like to update?',
            choices: employeeChoices
        }).then(answer => {
            // Query the database to fetch all roles
            db.query('SELECT id, title FROM roles', (err, roles) => {
                if (err) {
                    console.error('Error fetching roles: ' + err.message); // Log any errors if the query fails
                    return mainMenu(); // Return to main menu if there's an error
                }
                // Map fetched roles to format suitable for inquirer choices
                const roleChoices = roles.map(role => ({
                    name: role.title,
                    value: role.id
                }));

                // Prompt user to select a new role for the chosen employee
                inquirer.prompt({
                    type: 'list',
                    name: 'roleId',
                    message: 'Which role do you want to assign to the selected employee?',
                    choices: roleChoices
                }).then(roleAnswer => {
                    // Update the employee's role in the database
                    const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
                    db.query(query, [roleAnswer.roleId, answer.employeeId], (err, result) => {
                        if (err) {
                            console.error('Error updating employee role: ' + err.message); // Log any errors if the update fails
                            return mainMenu(); // Return to main menu if there's an error
                        }
                        console.log('Employee role updated successfully!'); // Confirm successful update
                        mainMenu(); // Return to main menu
                    });
                });
            });
        });
    });
}

// Function to update an employee's manager
function updateEmployeeManager() {
    // Fetch all employees to choose which one to update
    db.query('SELECT id, first_name, last_name FROM employees', (err, employees) => {
        if (err) {
            console.error('Error fetching employees: ' + err.message);
            return mainMenu();
        }
        const employeeChoices = employees.map(emp => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id
        }));

        // Prompt user to choose an employee to update their manager
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee whose manager you want to update:',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Select the new manager for the employee:',
                choices: employeeChoices.filter(emp => emp.value !== employeeId)
            }
        ]).then(answers => {
            // Update the manager in the database
            const query = 'UPDATE employees SET manager_id = ? WHERE id = ?';
            db.query(query, [answers.managerId, answers.employeeId], (err, result) => {
                if (err) {
                    console.error('Error updating employee\'s manager: ' + err.message);
                    return mainMenu();
                }
                console.log('Employee\'s manager updated successfully!');
                mainMenu();
            });
        });
    });
}
