const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'signup',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  address: {
    type: String,
    required: true
  }
},{
  timestamps:true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
