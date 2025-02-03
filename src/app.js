const mainMenu = require('./prompts');
require('dotenv').config(); // Load environment variables

console.log('Welcome to the Employee Management System!');
(async function () {
    await mainMenu(); // Start the CLI prompts
  })();