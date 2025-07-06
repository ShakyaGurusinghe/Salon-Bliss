const Voucher = require("../models/voucherModel");




// get all vouchers
const getVouchers = async (req, res, next) => {
  try {
    const vouchers = await Voucher.find();
    console.log("🎯 Found vouchers in DB:", vouchers); 
    res.status(200).json({
      success: true,
      data: { vouchers }, // ✅ matches frontend expectation
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




//create a voucher
const createVoucher = async(req,res,next) => {
    let voucher;
    const {code,title,description,discount,type,validFrom,validUntil,minSpend,maxDiscount,usageLimit,category,active} = req.body;
    try{
        voucher = new Voucher({code,title,description,discount,type,validFrom,validUntil,minSpend,maxDiscount,usageLimit,category,active});
        await voucher.save();
        return res.status(201).json({ message: "Voucher created successfully",voucher: voucher });
      
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



// //update a specific voucher
// const updateVoucher = async(req,res,next) => {
//     const id = req.params.id;
//     const {code,title,description,discount,type,validFrom,validUntil,minSpend,maxDiscount,usageLimit,category,active} = req.body;
    
//     let voucher;

//     try{
//         voucher = await Voucher.findByIdAndUpdate(id,{code:code,title:title,description:description,discount:discount,type:type,validFrom:validFrom,validUntil:validUntil,minSpend:minSpend,maxDiscount:maxDiscount,usageLimit:usageLimit,category:category,active:active});
//         voucher = await voucher.save();
//         return res.status(200).json({voucher,message: "voucher is successfully updated"})

//     }catch(err){
//         console.log(err);
//     }
//      if(!voucher){
//         return res.status(404).json({message: "Voucher is not updated"});
//     }
    
// }


const updateVoucher = async(req,res,next) => {
    const id = req.params.id;
    const {code,title,description,discount,type,validFrom,validUntil,minSpend,maxDiscount,usageLimit,category,active} = req.body;
    
    try {
        // Pass { new: true } to get the updated document returned
        const voucher = await Voucher.findByIdAndUpdate(
          id,
          { code, title, description, discount, type, validFrom, validUntil, minSpend, maxDiscount, usageLimit, category, active },
          { new: true }  // This is the key fix!
        );

        if (!voucher) {
          return res.status(404).json({ message: "Voucher not found" });
        }

        return res.status(200).json({ voucher, message: "Voucher is successfully updated" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error during update" });
    }
};




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


const getVoucherStats = async (req, res, next) => {
  try {
    const stats = await Voucher.getVoucherStats();
    res.status(200).json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting voucher stats" });
  }
};


module.exports = { getVouchers, createVoucher, getVoucherByID, updateVoucher, deleteVoucher, getVoucherStats };

