const Wishlist = require('../Model/Wishlist.model')
const Product = require("../Model/Products.model")
const User = require("../Model/User.model")

module.exports.addWishlistitems = async (req,res)=>{
try{
    const {userId,productId} = req.body

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        msg: "Product Not Found",
      });
    }

    const user = await User.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({
        msg: "User Not Found",
      });
    }

    
    let wishlist = await Wishlist.findOne({ product: productId ,userId:userId});
    if (wishlist) {
      return res.status(200).json({
        msg:"Product Already Added to Wishlist"
      })
    }else{
        wishlist = new Wishlist({
             userId,
             product:productId,
        });
    }
    await wishlist.save();
    return res.status(200).json({
      msg: "Product added to wishlist successfully",
      data: wishlist
    });
}catch(error){
    return res.status(500).json({
        msg:"Internal Server Error ",
        error:error
    })
}
}

module.exports.getWishlistItems = async (req, res) => {
    try {
      const userEmail  = req.params.email
      const wishlistItems = await Wishlist.find({userId:userEmail}).populate("product");
      return res.status(200).json({ msg: "Items fetched successfully", data: wishlistItems});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports.removefromwishlist = async(req,res)=>{
    try{
        const {id} = req.params

        const wishlistitem = await Wishlist.findById(id)
        if(!wishlistitem){
            return res.status(404).json({
                msg:"Item not found"
            })
        }

        const deleteitem = await Wishlist.findByIdAndDelete(id)
        return res.status(200).json({
            msg:"Item removed from Wishlist Successfull",
            data:deleteitem
        })

    }catch(error){

    }
  }