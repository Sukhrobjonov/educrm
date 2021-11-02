module.exports = (err, req, res, next) => {
    res.status(err.code || 500).json({
        ok: false,
        message: err.message || "Something went wrong",
    });
};
