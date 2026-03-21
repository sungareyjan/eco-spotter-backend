const express = require('express');
const routes = require('./routes/index.routes');
const setupSwagger = require('./docs/swagger');
const errorHandler = require('./middlewares/error-handler.middleware');

const requestIdMiddleware = require('./middlewares/request-id.middleware');
const loggerMiddleware = require('./middlewares/logger.middleware');
const responseTimeMiddleware = require('./middlewares/response-time.middleware')
const app = express();

app.use(express.json());

app.use(requestIdMiddleware);

app.use(loggerMiddleware);
app.use(responseTimeMiddleware);

app.use('/api', routes);
setupSwagger(app);
app.use(errorHandler);
module.exports = app;
