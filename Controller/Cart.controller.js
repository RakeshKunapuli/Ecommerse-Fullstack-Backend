const Cart = require("../Model/Cart.model");
const Product = require("../Model/Products.model.js");
const User = require("../Model/User.model.js")

module.exports.addToCart = async (req, res) => {
  try {
   const {userId,productId,quantity} = req.body

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        msg: "Product Not Found",
      });
    }

    let user = await User.findOne({email:userId})
    if(!user){
      return res.status(404).json({
        msg:"User Not found"
      })
    }

    let cart = await Cart.findOne({ product: product._id, userId: userId });
    if (cart) {
      cart.quantity += quantity;
    } else {
      cart = new Cart({ product: product._id, quantity, userId });
    }
    await cart.save();
    return res.status(200).json({
      msg: "Product added to cart successfully",
      data:cart
    });
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};


module.exports.getAllCartItems = async (req, res) => {
  try {
    const {userId} = req.body;
    const cartItems = await Cart.find({ userId: userId }).populate("product");
    return res
      .status(200)
      .json({ msg: "Items fetched Succesfully", data: cartItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
