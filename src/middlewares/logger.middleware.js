const getLogger = require('../logger/get-logger');

module.exports = function (req, res, next) {
    req.logger = getLogger(req);
    next();
};