const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: "Cart empty" });

    let total = 0;
    for (const it of items) {
      const p = await Product.findById(it.product);
      if (!p) return res.status(404).json({ message: "Product not found" });
      if (p.stock < it.qty) return res.status(400).json({ message: `${p.name} out of stock` });
      total += p.price * it.qty;
    }

    const order = await Order.create({
      customer: req.user._id,
      items,
      total
    });

    res.status(201).json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.payOrder = async (req, res) => {
  try {
    const { orderId, providerId } = req.body;
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "Paid") return res.status(400).json({ message: "Already paid" });

    for (const it of order.items) {
      const p = await Product.findById(it.product._id);
      p.stock = Math.max(0, p.stock - it.qty);
      await p.save();
    }

    order.status = "Paid";
    order.paymentInfo = { provider: "demo", providerId, paidAt: new Date() };
    await order.save();

    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 }).populate("items.product");
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
