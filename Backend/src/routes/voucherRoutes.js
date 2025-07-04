const express = require("express");
const {getVouchers,createVoucher,getVoucherByID,updateVoucher} = require("../controllers/voucherController");
const router = express.Router();

router.get("/",getVouchers);
router.post("/",createVoucher);
router.get("/:id",getVoucherByID);
router.put("/:id",updateVoucher);

module.exports = router;