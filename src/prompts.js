const inquirer = require('inquirer');
const { 
    viewDepartments, 
    viewRoles, 
    viewEmployees, 
    addDepartment, 
    addRole, 
    addEmployee, 
    updateEmployeeRole 
} = require('./queries');

async function mainMenu() {
    const { choice } = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }]);

    switch (choice) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit(); // Exits the process cleanly
            break;
    }

    // Recursively call the mainMenu function to loop back
    await mainMenu();
}

module.exports = mainMenu;