const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const product = new Product({
      ...req.body,
      image: imagePath,
      artisan: req.user.id,
    });

    await product.save();

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ artisan: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // ✔ all products
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, artisan: req.user.id },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Not allowed" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      artisan: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Not allowed" });
    }

    res.json({ message: "Product removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

