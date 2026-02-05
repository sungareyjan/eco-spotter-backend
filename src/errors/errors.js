const codes = require('./codes');

class ApiError extends Error {
    constructor(statusCode, code, message, extra = {}) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.extra = extra; // optional: fields, metadata, etc.
    }
}

const errorTypes = {
    BadRequest: (msg, fields = []) =>
        new ApiError(400, codes.VALIDATION_ERROR, msg, { fields }),

    Unauthorized: (msg) =>
        new ApiError(401, codes.AUTHENTICATION_ERROR, msg),

    Forbidden: (msg) =>
        new ApiError(403, codes.PERMISSION_ERROR, msg),

    NotFound: (msg) =>
        new ApiError(404, codes.NOT_FOUND, msg),

    Conflict: (msg) =>
        new ApiError(409, codes.VALIDATION_ERROR, msg),
};

module.exports = { ApiError, errorTypes };
