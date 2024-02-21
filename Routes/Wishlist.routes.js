const wishlistcontroller = require('../Controller/Wishlist.controller')
const express = require('express')
const router = express.Router()

router.post("/addToWishlist",wishlistcontroller.addWishlistitems)
router.get('/showwishlistitems/:email',wishlistcontroller.getWishlistItems)
router.delete("/deletitems/:id",wishlistcontroller.removefromwishlist)

module.exports = router