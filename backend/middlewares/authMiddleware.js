const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // Decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database and attach it to the req object
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error); // Add this to log the error
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
