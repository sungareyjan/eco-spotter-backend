const { getKey } = require('../config/rate-limiter');

const rateLimit = (limiter, options = {}) => {
    return async (req, res, next) => {
        const key = options.keyGenerator
        ? options.keyGenerator(req)
        : getKey(req);

        try {
        const result = await limiter.consume(key);

        // Optional headers (debug / monitoring)
        res.set({
            'X-RateLimit-Remaining': result.remainingPoints,
            'Retry-After': Math.ceil(result.msBeforeNext / 1000) || 0,
        });

        return next();
        } catch (rej) {
        const retryAfter = Math.ceil(rej.msBeforeNext / 1000) || 1;

        //  integrate pino logger
        req.log?.warn?.({
            type: 'RATE_LIMIT_BLOCK',
            key,
            endpoint: req.originalUrl,
            retryAfter,
        });

        return res.status(429).json({
            error: 'Too many requests',
            retryAfter,
        });
        }
    };
};

module.exports = rateLimit;