const User = require("../models/User");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminEmail = "admin@desi.com";
    const adminPass = "admin123";

    if (email !== adminEmail || password !== adminPass) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      token,
      role: "admin",
      user: { name: "Admin", email: adminEmail }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArtisans = async (req, res) => {
  try {
    const artisans = await User.find({ role: "artisan" })
      .select("-password");

    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("artisan", "name email");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listArtisans = async (req, res) => {
  const artisans = await User.find({ role: "artisan" });
  res.json(artisans);
};

exports.verifyArtisan = async (req, res) => {
  const artisan = await User.findById(req.params.id);
  if (!artisan) return res.status(404).json({ message: "Artisan not found" });

  artisan.isVerified = true;
  await artisan.save();

  res.json({ message: "Artisan Verified", artisan });
};

// admin stats (you may already have this)
exports.getAdminStats = async (req, res) => {
  try {
    const pendingArtisans = await User.countDocuments({ role: "artisan", status: "Pending" });
    const approvedArtisans = await User.countDocuments({ role: "artisan", status: "Approved" });
    const pendingProducts = await Product.countDocuments({ status: "Pending" });

    res.json({ pendingArtisans, pendingProducts, approvedArtisans });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve product
exports.approveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject product
exports.rejectProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve artisan
exports.approveArtisan = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: "Approved" }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject artisan
exports.rejectArtisan = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: "Rejected" }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

