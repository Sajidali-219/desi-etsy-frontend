const jwt = require("jsonwebtoken");
const User = require("../models/User");

// USER AUTH
exports.auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

    if (!token)
      return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.log("Auth Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ROLE AUTHORIZER (dynamic for any role)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });

    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Not allowed" });

    next();
  };
};

exports.authArtisan = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.role !== "artisan") {
      return res.status(403).json({ message: "Not artisan" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Auth failed" });
  }
};

exports.authAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ADMIN role check
    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "Not admin" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};