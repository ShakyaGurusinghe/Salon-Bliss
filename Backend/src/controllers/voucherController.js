const Voucher = require("../models/voucherModel");


//get all vouchers
const getVouchers = async(req,res,next)=>{
    let vouchers;
    try{    
        vouchers = await Voucher.find();
        return res.status(200).json({vouchers}); 

    } catch(err){
        console.log(err);
        return res.status(404).json({message: "Error with finding the vouchers"});
    }
    //not found
     if(!vouchers){
        return res.status(400).json({message:"No vouchers found"}); 
    };

};


//create a voucher


module.exports = {getVouchers};