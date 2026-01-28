// const { Sequelize } = require('sequelize');
// const dbConfig = require('../config/config').development; // only development

// module.exports = async function createDatabaseIfNotExists() {
//     const sequelize = new Sequelize(
//         'master', // connect to master to create DB
//         dbConfig.username,
//         dbConfig.password,
//         {
//         host: dbConfig.host,
//         port: dbConfig.port,
//         dialect: dbConfig.dialect,
//         dialectOptions: dbConfig.dialectOptions,
//         logging: false
//         }
//     );

//     await sequelize.authenticate();

//     await sequelize.query(`
//         IF DB_ID('${dbConfig.database}') IS NULL
//         CREATE DATABASE [${dbConfig.database}];
//     `);

//     await sequelize.close();
// };

const { Sequelize } = require('sequelize');
const dbConfig = require('../config/config').development;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function waitForMssql(maxRetries = 10, delay = 3000) {
    let retries = maxRetries;

    while (retries > 0) {
        try {
        const sequelize = new Sequelize(
            'master',
            dbConfig.username,
            dbConfig.password,
            {
            host: dbConfig.host,
            port: dbConfig.port,
            dialect: dbConfig.dialect,
            dialectOptions: dbConfig.dialectOptions,
            logging: false,
            }
        );

        await sequelize.authenticate();
        console.log('✅ MSSQL is ready');
        return sequelize;
        } catch (err) {
        retries--;
        console.log(`⏳ Waiting for MSSQL... retries left: ${retries}`);
        await sleep(delay);
        }
    }

    throw new Error('❌ MSSQL not ready after max retries');
}

module.exports = async function createDatabaseIfNotExists() {
    const sequelize = await waitForMssql();

    await sequelize.query(`
        IF DB_ID('${dbConfig.database}') IS NULL
        CREATE DATABASE [${dbConfig.database}];
    `);

    console.log(`✅ Database "${dbConfig.database}" ensured`);
    await sequelize.close();
};
