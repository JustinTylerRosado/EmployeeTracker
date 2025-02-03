const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

// PostgreSQL Connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'your_database',
    password: process.env.DB_PASSWORD || 'yourpassword',
    port: process.env.DB_PORT || 5432
});

// Export pool for reuse in other files
module.exports = pool;