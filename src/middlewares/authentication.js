const jwt = require('jsonwebtoken');
const { errorTypes } = require('../errors/errors'); // centralized errors

const authenticateJWT = (req, res, next) => {
const authHeader = req.headers.authorization;

    if (!authHeader) {
        // Pass error to centralized handler
        return next(errorTypes.Unauthorized("No token provided"));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // token valid → continue
    } catch (err) {
        // Pass invalid token error to centralized handler code 403
        return next(errorTypes.Forbidden("Invalid token"));
    }
};

module.exports = authenticateJWT;
