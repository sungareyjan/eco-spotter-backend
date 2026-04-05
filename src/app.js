const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index.routes');
const setupSwagger = require('./docs/swagger');
const errorHandler = require('./middlewares/error-handler.middleware');

const requestIdMiddleware = require('./middlewares/request-id.middleware');
const loggerMiddleware = require('./middlewares/logger.middleware');
const responseTimeMiddleware = require('./middlewares/response-time.middleware');

const rateLimitMiddleware = require('./middlewares/rate-limiter.middleware');
const { globalLimiter } = require('./config/rate-limiter')

// TODO: CORS & Helmet Security

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieParser());
app.use(requestIdMiddleware);

app.use(loggerMiddleware);
app.use(responseTimeMiddleware);
app.use('/api', rateLimitMiddleware(globalLimiter));
app.use('/api', routes);
setupSwagger(app);
app.use(errorHandler);
module.exports = app;
