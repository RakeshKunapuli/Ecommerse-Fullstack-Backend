const cartcontroller = require('../Controller/Cart.controller')
const express = require('express')
const router = express.Router()

router.post('/additems',cartcontroller.addToCart)
router.get('/showitems', cartcontroller.getAllCartItems);

module.exports = router