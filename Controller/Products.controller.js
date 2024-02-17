const products = require('../Model/Products.model')

module.exports.addProducts= async (req,res)=>{
    try{
        const {title,description,price,category,brand,thumbnail,images} = req.body

        if(!title || !description || !price || !category || !brand || !thumbnail || !images){
            return res.status(400).json({
                msg:"All Fields Are Required"
            })
        }
        const Product = await products.create(req.body)
         return res.status(200).json({
            msg:'New Product Created',
            data:Product
        })

    }catch(err){
       return  res.status(500).json({
            msg:"Unable Connect To Server"
        })
    }
}

module.exports.allProducts = async (req,res)=>{
    try{
        const allProducts = await products.find({})
        return res.status(200).json({
            msg:"All Products Fetched Succesfully",
            data:allProducts
        })
    }catch(err){
        return res.status(500).json({
            msg:"Unable fetch products data",
            error:err
        })
    }
}

module.exports.deleteProduct = async (req,res)=>{
    try{
        const checkProduct = await products.findById(req.params.id)
        if(!checkProduct){
            return res.status(404).json({
                msg:'Product does not found',
                err:err.message
            })
        }

        const deleteProduct = await products.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            mash:"Succesfully Product Deleted ",
            data:deleteProduct
        })

    }catch(err){
        return res.status(400).json({
            msg:'Unable to delete Item',
            err:err.message
        })
    }
}

module.exports.updateProduct = async (req,res)=>{

    try{
        const existingProduct = await products.findById(req.params.id)
        if(!existingProduct){
            return res.status(404).json({
                msg:"Unable to find the Product",
                error:err.message
            })
        }

        existingProduct.title = req.body.title || existingProduct.title
        existingProduct.description = req.body.description || existingProduct.description
        existingProduct.price = req.body.price || existingProduct.price
        existingProduct.category = req.body.category || existingProduct.category
        existingProduct.brand = req.body.brand || existingProduct.brand
        existingProduct.thumbnail = req.body.thumbnail || existingProduct.thumbnail

        existingProduct.images = [...existingProduct.images,...req.body.images]

        const updatedproducts = await existingProduct.save()

        return res.status(200).json({
            msg:"Product Updated Successfully",
            data:updatedproducts
        })

    }catch(err){
        return res.status(500).json({
            msg:"Unable to connect to server",
            error:err.message
        })
    }
}

module.exports.getProductById = async (req,res)=>{
    try{
        const productId = req.params.id
        if(!productId){
            return res.status(401).json({
                msg:"ProductId is required"
            })
        }
        
        const product = await products.findById(productId)
        if(!product){
            return res.status(401).json({
                msg:"product Not found"
            })
        }

        return res.status(200).json({
            msg:"Succesfully fetched Product",
            data:product
        }) 
    }catch(err){
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}




