const express = require('express');
const routes = require('./routes/index.routes');
const setupSwagger = require('./docs/swagger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use('/api', routes);
setupSwagger(app);
app.use(errorHandler);
module.exports = app;
