// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../Controller/Order.controller')

router.post('/place-order/:id', orderController.addOrder);
router.get('/order-placed/:email', orderController.getOrders);

module.exports = router;
