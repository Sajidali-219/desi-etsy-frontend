require("dotenv").config();
console.log("Loaded Key:", process.env.RAZORPAY_KEY_ID);
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes =require('./routes/authRoutes')
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");

connectDB();

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => res.json({ success: true, message: "Artisan Marketplace API is running" }));


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
