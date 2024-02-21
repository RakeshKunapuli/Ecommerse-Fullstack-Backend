const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'signup',
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    }
},{
    timestamps:true
});

let Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist
