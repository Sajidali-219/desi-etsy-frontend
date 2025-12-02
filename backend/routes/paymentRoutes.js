const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

const {
  createRazorpayOrder,
  verifyRazorpayOrder
} = require("../utils/razorpay");

// routes/paymentRoutes.js ---- create-order
router.post("/create-order", auth, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: "Cart empty" });

    // 1) SUBTOTAL
    let subtotal = 0;
    items.forEach(i => {
      subtotal += i.price * i.qty;
    });

    // 2) FIXED DELIVERY CHARGE
    const delivery = 40;

    // 3) DISCOUNT (optional)
    const discount = 0;

    // 4) FINAL TOTAL
    const total = subtotal + delivery - discount;

    console.log("TOTAL Sent to Razorpay:", total);

    // Save order
    const dbOrder = await Order.create({
      customer: req.user._id,
      items,
      subtotal,
      delivery,
      discount,
      total,
      status: "Pending"
    });

    // Razorpay order
    const rpOrder = await createRazorpayOrder(total, dbOrder._id.toString());

    res.json({
      success: true,
      razorpayOrder: rpOrder,
      orderId: dbOrder._id
    });
  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


router.post("/verify", auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const valid = verifyRazorpayOrder(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!valid)
      return res.status(400).json({ message: "Invalid payment signature" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Paid";
    order.paymentInfo = {
      provider: "razorpay",
      providerId: razorpay_payment_id,
      paidAt: new Date()
    };

    await order.save();

    // SAVE IN PAYMENT COLLECTION
    await Payment.create({
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: order.total,
      status: "Success"
    });

    res.json({ success: true, order });
  } catch (err) {
    console.log("VERIFY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

