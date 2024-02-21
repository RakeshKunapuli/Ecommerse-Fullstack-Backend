const Cart = require("../Model/Cart.model");
const Product = require("../Model/Products.model.js");
const User = require("../Model/User.model.js");

module.exports.addToCart = async (req, res) => { 
  try {
    const { userId, productId, quantity } = req.body;

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


    let cart = await Cart.findOne({ product: productId ,userId:userId});
    if (cart) {
      cart.quantity += quantity;
    } else {
      cart = new Cart({
         product: productId,
          quantity,
           userId });
    }
    await cart.save();
    return res.status(200).json({
      msg: "Product added to cart successfully",
      data: cart
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error: error });
  }
};

module.exports.getAllCartItems = async (req, res) => {
  try {
    const userEmail  = req.params.email
    const cartItems = await Cart.find({userId:userEmail}).populate("product");
    return res.status(200).json({ msg: "Items fetched successfully", data: cartItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.removeCartItems = async (req,res)=>{
  try{
    const checkitem = await Cart.findById(req.params.id)
    if(!checkitem){
      return res.status(404).json({
        msg:"Item not found"
      })
    }

    const deleteitem = await Cart.findByIdAndDelete(req.params.id)
    return res.status(200).json({
      msg:"Item Deleted Succesfully"
    })

  }catch(error){
    return res.status(500).json({msg:"Internal server error ",error:error})
  }
}