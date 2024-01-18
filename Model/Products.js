const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema(
    {
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
category:{
    type:String,
    required:true
},
brand:{
    type:String,
    required:true
},
thumbnail:{
    type:String,
    required:true
},
images:{
    type:[String],
    required:true
},
},{
    timestamps:true
}
)

const products = mongoose.model('Products',ProductsSchema)
module.exports = products