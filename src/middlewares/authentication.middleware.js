const jwt = require('jsonwebtoken');
const { errorTypes } = require('../errors/errors'); // centralized errors
const { isBlacklisted } = require('../services/token-store.service');

const authenticateJWT = async (req, res, next) => {
    //  to read token from cookie first, fallback to Authorization header
    const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(errorTypes.Unauthorized("No access token provided"));
    }

    const blocked = await isBlacklisted(token);
    if (blocked) {
        return next(errorTypes.Forbidden("Token has been revoked"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user payload to request
        next(); // token is valid
    } catch (err) {
        return next(errorTypes.Forbidden("Invalid or expired access token"));
    }
};

module.exports = authenticateJWT;