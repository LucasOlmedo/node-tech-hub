const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({
            error: error.errors.map((err) => ({
                key: err.path,
                message: err.message,
            })),
        });
    }
};

module.exports = validateSchema;
