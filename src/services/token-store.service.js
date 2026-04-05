const redis = require('../config/redis');

const setRefreshToken = (userId, token, ttl) => // ttl = Time To Live
    redis.set(`refresh:${userId}`, token, 'EX',   ttl  );

const getRefreshToken = (userId) =>
    redis.get(`refresh:${userId}`);

const deleteRefreshToken = (userId) =>
    redis.del(`refresh:${userId}`);

const blacklistToken = (token, ttl) =>
    redis.set(`blacklist:${token}`, true, 'EX', ttl);

const isBlacklisted = (token) =>
    redis.get(`blacklist:${token}`);

module.exports = {
    setRefreshToken,
    getRefreshToken,
    deleteRefreshToken,
    blacklistToken,
    isBlacklisted
};