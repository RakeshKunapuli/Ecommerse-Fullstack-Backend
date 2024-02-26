const Order = require("../Model/Order.model")
const Cart = require("../Model/Cart.model")

module.exports.addOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;
    const cartItems = await Cart.find({ userId }).populate('product');
    const items = cartItems.map(cartItem => ({
      product: cartItem.product._id,
      quantity: cartItem.quantity
    }));

    const order = new Order({ userId, items, address });
    await order.save();

    await Cart.deleteMany({ userId });

    res.status(201).json({ message: 'Order placed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports.getOrders = async (req,res) =>{
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json({msg:"Order Items fetched Succesfull",data:orders});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}
