const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log('Sequelize NODE_ENV:', process.env.NODE_ENV);
console.log('Using DB:', process.env.DB_NAME);

module.exports = {
    development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mssql',
    dialectOptions: {
        options: {
        encrypt: false,
        trustServerCertificate: true
        }
    },
    autoCreateDatabase: process.env.AUTO_CREATE_DB === "true",
    },

    test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mssql',
    logging: false
    }
};
