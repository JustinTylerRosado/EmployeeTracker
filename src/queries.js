const pool = require('../db/db'); // Import database connection
const inquirer = require('inquirer');

// View all departments
const viewDepartments = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM department;');
        console.table(rows);
    } catch (err) {
        console.error('Error fetching departments:', err);
    }
};

// View all roles
const viewRoles = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT role.id, role.title, department.name AS department, role.salary
            FROM role
            JOIN department ON role.department_id = department.id;
        `);
        console.table(rows);
    } catch (err) {
        console.error('Error fetching roles:', err);
    }
};

// View all employees
const viewEmployees = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department, role.salary, 
                CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee e
            JOIN role ON e.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee m ON e.manager_id = m.id;
        `);
        console.table(rows);
    } catch (err) {
        console.error('Error fetching employees:', err);
    }
};

// Add a new department
const addDepartment = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter department name:',
        }
    ]);

    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Added new department: ${name}`);
    } catch (err) {
        console.error('Error adding department:', err);
    }
};

// Add a new role
const addRole = async () => {
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter role title:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter role salary:',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter department ID:',
        }
    ]);

    try {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
        console.log(`Added new role: ${title}`);
    } catch (err) {
        console.error('Error adding role:', err);
    }
};

// Add a new employee
const addEmployee = async () => {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter employee's first name:",
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter employee's last name:",
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Enter employee's role ID:",
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Enter manager's ID (leave blank if none):",
            default: null
        }
    ]);

    try {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
            [first_name, last_name, role_id, manager_id || null]);
        console.log(`Added new employee: ${first_name} ${last_name}`);
    } catch (err) {
        console.error('Error adding employee:', err);
    }
};

// Update an employee's role
const updateEmployeeRole = async () => {
    const { employee_id, new_role_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter employee ID to update:',
        },
        {
            type: 'input',
            name: 'new_role_id',
            message: "Enter new role ID for the employee:",
        }
    ]);

    try {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);
        console.log(`Updated employee ID ${employee_id} to new role ID ${new_role_id}`);
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
};

module.exports = { 
    viewDepartments, 
    viewRoles, 
    viewEmployees, 
    addDepartment, 
    addRole, 
    addEmployee, 
    updateEmployeeRole 
};