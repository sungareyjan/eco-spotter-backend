const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    enableOfflineQueue: false,
});

// Key generator (IP + user if available)
const getKey = (req) => {
    return req.user?.id || req.ip;
};

// Global limiter
const globalLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: 'rl_global',
    points: 200,
    duration: 60,
    blockDuration: 60,
});

// Auth limiter (strict)
const authLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: 'rl_auth',
    points: 5,
    duration: 60,
    blockDuration: 300,
});

//  Heavy endpoints (uploads, etc.)
const heavyLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: 'rl_heavy',
    points: 20,
    duration: 60,
});

//  Refresh token limiter
const refreshLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: 'rl_refresh',
    points: 20,      // 20 refresh requests
    duration: 60,    // per minute
    blockDuration: 60
})

// Logout limiter
const logoutLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: 'rl_logout',
    points: 30,
    duration: 60,
});

module.exports = {
    redis,
    getKey,
    globalLimiter,
    authLimiter,
    heavyLimiter,
    refreshLimiter,
    logoutLimiter
};