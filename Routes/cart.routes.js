const cartcontroller = require('../Controller/Cart.controller')
const express = require('express')
const router = express.Router()

router.post('/carts',cartcontroller.addToCart)
router.get('/cartitems', cartcontroller.getAllCartItems);
module.exports = router