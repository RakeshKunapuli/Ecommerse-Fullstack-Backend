const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'signup',
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
},{
    timestamps:true
});

let Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart
