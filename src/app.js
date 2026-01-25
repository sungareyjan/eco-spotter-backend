const express = require('express');
require('dotenv').config();

const { sequelize } = require('./models');
const routes = require('./routes/index.routes');
const app = express();

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => res.send('Hello World!'));

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        app.listen(process.env.PORT || 3000, () =>
        console.log(`Server running on port ${process.env.PORT || 3000}`)
        );
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
})();
