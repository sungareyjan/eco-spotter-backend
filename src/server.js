require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const createDatabaseIfNotExists = require('./db/bootstrap');
const config = require('./config/config').development;

(async () => {
    try {
        if (config.autoCreateDatabase) {
            await createDatabaseIfNotExists();
        }

        await sequelize.authenticate();
        console.log('Database connected');

        app.listen(process.env.PORT || 3000, () => {
            console.log('Server running');
        });

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
