

module.exports.Checks = async (req, res, next) => {
    try {
        const { title, description, price, category, brand, thumbnail, images } = req.body;
        if (!title || !description || !price || !category || !brand || !thumbnail || !images) {
            return res.status(400).json({
                msg: "All Fields Are Required"
            });
        }
        // If all checks pass, proceed to the next middleware/controller
        next();
    } catch (err) {
        return res.status(500).json({
            msg: "Internal Server Error",
            err: err.message  // Include the actual error message in the response
        });
    }
};


