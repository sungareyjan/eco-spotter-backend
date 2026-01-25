const path = require('path');
const dotenv = require('dotenv');

// Load correct env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

module.exports = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "mssql",
    dialectOptions: {
        options: {
        encrypt: false,
        trustServerCertificate: true
        }
    }
};
