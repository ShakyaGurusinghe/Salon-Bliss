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
const createVoucher = async(req,res,next) => {
    let voucher;
    const {code,title,description,discount,type,validFrom,validUntil,minSpend,maxDiscount,usageLimit,category,active} = req.body;
    try{
        voucher = new Voucher({code,title,description,discount,type,validFrom,validUntil,minSpend,maxDiscount,usageLimit,category,active});
        await voucher.save();
        return res.status(200).json({message:"Voucher is created Successfully"}).json({voucher});;
      
    }catch(err){
        console.log(err);
    }

    //not insert voucher
    if(!voucher){
        return res.status(404).json({message:"unable to create a voucher"});
    }
};

//get a specific voucher
const getVoucherByID = async(req,res,next) => {
    const id = req.params.id;
    let voucher;

    try{
        voucher = await Voucher.findById(id);
        res.status(200).json({voucher, message:"Voucher retrieved successfully"});
    }catch(err){
        console.log(err);
    }

    //if not found
    if(!voucher){
        res.status(404).json({message: "Voucher is not found"});
    }
}



//update a specific voucher
const updateVoucher = async(req,res,next) => {
    const id = req.params.id;
    const {code,title,description,discount,type,validFrom,validUntil,minSpend,maxDiscount,usageLimit,category,active} = req.body;
    
    let voucher;

    try{
        voucher = await Voucher.findByIdAndUpdate(id,{code:code,title:title,description:description,discount:discount,type:type,validFrom:validFrom,validUntil:validUntil,minSpend:minSpend,maxDiscount:maxDiscount,usageLimit:usageLimit,category:category,active:active});
        voucher = await voucher.save();
        return res.status(200).json({voucher,message: "voucher is successfully updated"})

    }catch(err){
        console.log(err);
    }
     if(!voucher){
        return res.status(404).json({message: "Voucher is not updated"});
    }
    
}

//delete a specific voucher
const deleteVoucher = async(req,res,next) => {
    const id = req.params.id;

    try{
        await Voucher.findByIdAndDelete(id);
        return res.status(200).json({message:"Voucher deleted successfully"});
    }catch(err){
        console.log(err);
    }
    if(!voucher){
        return res.status(404).json({message: "Can't delete the voucher"});
    }
}

module.exports = {getVouchers, createVoucher,getVoucherByID,updateVoucher,deleteVoucher};