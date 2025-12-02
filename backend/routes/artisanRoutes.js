const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware");
const { addProduct, getMyProducts } = require("../controllers/artisanController");

router.post("/products", auth, addProduct);
router.get("/products", auth, getMyProducts);

module.exports = router;
