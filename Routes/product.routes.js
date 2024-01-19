const productController = require('../Controller/Products.controller')
const express = require('express')
const {Checks} = require('../MiddleWares/Checks.middleware')
const router = express.Router()


router.post('/addproducts', Checks ,productController.addProducts)
router.get('/allproducts',productController.allProducts)
router.delete('/deleteproduct/:id',productController.deleteProduct)
router.put('/updateproduct/:id',productController.updateProduct)


module.exports = router
