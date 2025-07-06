const express = require("express");
const {getVouchers,createVoucher,getVoucherByID,updateVoucher,deleteVoucher,getVoucherStats} = require("../controllers/voucherController");
const router = express.Router();

router.get("/",getVouchers);
router.post("/",createVoucher);
router.get('/stats', getVoucherStats);
router.get("/:id",getVoucherByID);
router.put("/:id",updateVoucher);
router.delete("/:id",deleteVoucher);


module.exports = router;