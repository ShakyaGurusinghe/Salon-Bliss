const express = require("express");
const {getVouchers} = require("../controllers/voucherController");
const router = express.Router();

router.get("/",getVouchers);

module.exports = router;