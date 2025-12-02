const router = require("express").Router();
const { 
  customerRegister,
  customerLogin,
  artisanRegister,
  artisanLogin,
  adminLogin
} = require("../controllers/authControllers")


router.post("/customer/register", customerRegister);
router.post("/customer/login", customerLogin);

router.post("/artisan/register", artisanRegister);
router.post("/artisan/login", artisanLogin);

router.post("/admin/login", adminLogin);  

module.exports = router