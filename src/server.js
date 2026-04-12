require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const createDatabaseIfNotExists = require('./db/bootstrap');
const config = require('./config/config').development;
const cron = require('node-cron');
const { zipDailyLogs } = require('./utils/archiver');

(async () => {
    try {
        if (config.autoCreateDatabase) {
            await createDatabaseIfNotExists();
        }

        await sequelize.authenticate();
        console.log('Database connected');

        app.listen(process.env.PORT || 3000, () => {
            console.log('Server running');
            //11:59 PM according server's local time.
            // cron.schedule('*/1 * * * *', () => { // for testing
            cron.schedule('59 23 * * *', () => {
                ['error', 'access'].forEach(type => zipDailyLogs(type));
                console.log('Daily logs archived');
            });
        });

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
