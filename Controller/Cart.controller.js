const Cart = require('../Model/Cart.model')
const Product = require('../Model/Products.model.js')

module.exports.addToCart = async (req,res)=>{
try{
    const productId = req.body.productId
    const quantity = req.body.quantity || 1

    const product = await Product.findById(productId)
    if(!product){
        return res.status(404).json({
            msg:"Product Not Found"
        })
    }

    let cart = await Cart.findOne({product:product._id})
    if(cart){
        cart.quantity += quantity
    }else{
        cart = new Cart({ product: product._id, quantity });
    }

    await cart.save()
    return res.status(200).json({ msg: "Product added to cart successfully" });

}catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
}
}


module.exports.getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('product');
        return res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

