const express = require("express");
const {getVouchers,createVoucher,getVoucherByID} = require("../controllers/voucherController");
const router = express.Router();

router.get("/",getVouchers);
router.post("/",createVoucher);
router.get("/:id",getVoucherByID);

module.exports = router;