const { appLogger, errorLogger, debugLogger } = require('./logger');

function getLogger(req) {
    const attachReqId = (logger) => ({
        info: (data) => logger.info({ reqId: req.id, ...data }),
        warn: (data) => logger.warn({ reqId: req.id, ...data }),
        error: (data) => logger.error({ reqId: req.id, ...data }),
        debug: (data) => logger.debug({ reqId: req.id, ...data }),
    });

    return {
        app: attachReqId(appLogger),
        error: attachReqId(errorLogger),
        debug: attachReqId(debugLogger),
    };
}

module.exports = getLogger;