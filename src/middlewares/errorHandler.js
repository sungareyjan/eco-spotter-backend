function errorHandler(err, req, res, next) {
    const status = err.statusCode || 500;
    const code = err.code || 500;
    const message = err.message || "Internal server error";

    console.error(err); // logs stack for dev

    res.status(status).json({
        status: 'error',
        code,
        message,
        ...(err.extra || {}) // fields, metadata
    });
}

module.exports = errorHandler;
