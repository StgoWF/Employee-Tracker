// Import necessary modules
const inquirer = require('inquirer');
const db = require('./db/connection');

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
// Function to view all roles
function viewRoles() {
    const query = 'SELECT * FROM roles';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching roles: ' + err.message);
            return mainMenu();
        }
        console.table(results);
        mainMenu();
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID for this role?'
        }
    ]).then(answer => {
        const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(query, [answer.title, answer.salary, answer.departmentId], (err, results) => {
            if (err) {
                console.error('Error adding role: ' + err.message);
                return mainMenu();
            }
            console.log('Added new role successfully!');
            mainMenu();
        });
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

// Initialize the application
mainMenu();
