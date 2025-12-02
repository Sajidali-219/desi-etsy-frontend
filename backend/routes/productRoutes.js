const router = require("express").Router();
const { authArtisan, auth } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const Product = require("../models/Product");

const {
  addProduct,
  getMyProducts,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ADD product
router.post("/add", auth, upload.single("image"), addProduct);

// My Products
router.get("/my-products", authArtisan, getMyProducts);

// LIST all products
router.get("/", getAllProducts);

// ⭐ IMPORTANT: GET SINGLE PRODUCT (must be above PUT/DELETE)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "artisan",
      "name email"
    );

    if (!product) return res.status(404).json({ message: "Not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE product
router.put("/:id", authArtisan, updateProduct);

// DELETE product
router.delete("/:id", authArtisan, deleteProduct);

module.exports = router;
