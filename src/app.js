const express = require('express');
const routes = require('./routes/index.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
