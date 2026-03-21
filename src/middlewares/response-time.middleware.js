module.exports = function responseTimeMiddleware(req, res, next) {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        const logData = {
            endpoint: req.originalUrl,
            method: req.method,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
        };

        if (duration > 500) {
            req.logger?.app.warn({
                ...logData,
                message: 'Slow request detected'
            });
        } else {
            req.logger?.app.info({
                ...logData,
                message: "Request completed"
            });
        }
    });

    next();
};