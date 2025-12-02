const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.customerRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const exist = await User.findOne({ email: normalizedEmail });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: "customer",
    });

    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail, role: "customer" });
    if (!user) return res.status(404).json({ message: "Customer not found" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(user._id, user.role);
    return res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.artisanRegister = async (req, res) => {
  try {
    const { name, email, password, phone, location, bio, category } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const exist = await User.findOne({ email, role: "artisan" });
    if (exist) {
      return res.status(400).json({ message: "Artisan already exists. Please login." });
    }

    await User.create({
      name,
      email,
      password,
      phone,
      location,
      bio,
      category,
      role: "artisan",
      artisanStatus: "Pending",
    });

    return res.status(201).json({
      message: "Artisan registered successfully. Pending admin approval."
    });

  } catch (error) {
    console.log("REGISTRATION ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Server error during registration" });
  }
};

exports.artisanLogin = async (req, res) => {
  const { email, password } = req.body;

  const artisan = await User.findOne({ email, role: "artisan" });

  if (!artisan) {
    return res.status(404).json({ message: "Artisan not found" });
  }

  const isMatch = await artisan.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = generateToken(artisan._id, artisan.role);
  res.json({ token });
};

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

