function errorHandle(err, req, res, next) {
    const status = err.statusCode || 500;
    res.status(status).json({
        error: err.name || 'Internal Server Error',
        message: err.message || 'Something went wrong',
    });
}

module.exports = errorHandle;
