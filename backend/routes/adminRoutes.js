const express = require("express");
const router = express.Router();

const { authAdmin } = require("../middlewares/authMiddleware");

const {
  adminLogin,
  listArtisans,
  verifyArtisan,
  getAdminProducts,
  getAdminStats,
  approveProduct,
  rejectProduct,
  approveArtisan,
  rejectArtisan,
} = require("../controllers/adminController");

router.post("/login", adminLogin);

// artisan list (no need auth)
router.get("/artisans", listArtisans);

// artisan verification
router.post("/artisans/:id/verify", authAdmin, verifyArtisan);

// dashboard stats
router.get("/stats", authAdmin, getAdminStats);

// products for admin
router.get("/products", getAdminProducts);

// approvals
router.put("/product/:id/approve", authAdmin, approveProduct);
router.put("/product/:id/reject", authAdmin, rejectProduct);

router.put("/artisan/:id/approve", authAdmin, approveArtisan);
router.put("/artisan/:id/reject", authAdmin, rejectArtisan);

module.exports = router;
