const crypto = require('crypto');

module.exports = function (req, res, next) {
    req.id = crypto.randomUUID();
    res.setHeader('X-Request-Id', req.id);
    next();
};