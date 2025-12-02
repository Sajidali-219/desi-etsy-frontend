const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware");
const orderController = require("../controllers/orderController");

router.post("/", auth, orderController.createOrder);       
router.post("/pay", auth, orderController.payOrder);       
router.get("/my", auth, orderController.getMyOrders);      

module.exports = router;
