const Order = require("../models/Order");
const {
  createRazorpayOrder,
  verifyRazorpayOrder,
} = require("../utils/razorpay");

// ---------- CREATE ORDER ----------
exports.createOrderRazor = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    let total = 0;
    items.forEach((i) => (total += i.price * i.qty));

    const dbOrder = await Order.create({
      customer: req.user._id,
      items,
      total,
      status: "Pending",
    });

    const order = await createRazorpayOrder(total, dbOrder._id.toString());

    res.json({
      success: true,
      razorpayOrder: order,
      orderId: dbOrder._id,
    });
  } catch (err) {
    console.log("Payment Create Error:", err);
    res.status(500).json({ message: "Payment order creation failed" });
  }
};

// ---------- VERIFY PAYMENT ----------
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const isValid = verifyRazorpayOrder(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({ message: "Invalid Signature" });
    }

    const order = await Order.findById(orderId);
    order.status = "Paid";
    order.paymentInfo = {
      providerId: razorpay_payment_id,
    };

    await order.save();

    res.json({ success: true });
  } catch (err) {
    console.log("Verify Error:", err);
    res.status(500).json({ message: "Verification failed" });
  }
};
