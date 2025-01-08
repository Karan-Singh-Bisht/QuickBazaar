const jwt = require("jsonwebtoken");

const verifyUserToken = async (req, res, next) => {
  // Extract token from cookies or headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach user to request object
    req.user = user;
    next();
  });
};

module.exports = verifyUserToken;
