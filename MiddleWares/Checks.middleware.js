

module.exports.Checks = async (req, res, next) => {
  try {
    const { title, description, price, category, brand, thumbnail, images } =
      req.body;
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !brand ||
      !thumbnail ||
      !images
    ) {
      return res.status(400).json({
        msg: "All Fields Are Required",
      });
    }
    // If all checks pass, proceed to the next middleware/controller
    next();
  } catch (err) {
    return res.status(500).json({
      msg: "Internal Server Error",
      err: err.message, // Include the actual error message in the response
    });
  }
};


const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.validator = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      message: "Access denied, Token is missing",
    });
  }

  jwt.verify(token, process.env.JSON_TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token has expired",
        });
      } else {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
    }

    req.user = decoded;
    next();
  });
};
