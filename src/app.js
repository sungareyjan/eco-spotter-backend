require('dotenv').config();

const express = require('express');
const { sequelize } = require('./config/database'); // database now sees env vars

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api', require('./routes/index.routes'));
app.get('/', (req, res) => res.send('Hello World!'));//test if working

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Database connection failed:', err);
    }
})();
