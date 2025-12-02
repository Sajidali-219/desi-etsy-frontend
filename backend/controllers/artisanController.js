const ArtisanProduct = require("../models/ArtisanProduct");

// POST: Add new product
exports.addProduct = async (req, res) => {
  try {
    const product = await ArtisanProduct.create({
      ...req.body,
      artisan: req.user._id
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: Fetch all products of logged-in artisan
exports.getMyProducts = async (req, res) => {
  try {
    const products = await ArtisanProduct.find({ artisan: req.user._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
