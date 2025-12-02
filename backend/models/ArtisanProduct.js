const mongoose = require("mongoose");

const ArtisanProductSchema = new mongoose.Schema({
  artisan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  description: { type: String },
  imageUrl: { type: String, default: "" },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  }
}, { timestamps: true });

module.exports = mongoose.model("ArtisanProduct", ArtisanProductSchema);
