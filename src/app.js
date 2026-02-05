const express = require('express');
require('dotenv').config();

const { sequelize } = require('./models');
const routes = require('../src/routes/index.routes');
const createDatabaseIfNotExists = require('./db/bootstrap');
const config = require('./config/config').development;
const errorHandler = require('./middlewares/errorHandler');
const app = express();
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

(async () => {
    try {
        if (config.autoCreateDatabase) {
            await createDatabaseIfNotExists();
        }

        await sequelize.authenticate();
        console.log('Database connected');

        app.listen(process.env.PORT || 3000, () => console.log(`Server running`));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
