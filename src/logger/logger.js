const DynamicLogger = require('./dynamic-logger');

const appLogger = new DynamicLogger('app', 'info').instance;
const errorLogger = new DynamicLogger('error', 'error').instance;
const debugLogger = new DynamicLogger('debug', 'debug').instance;

module.exports = {
    appLogger,
    errorLogger,
    debugLogger
};