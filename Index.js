const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productroutes = require('./Routes/product.routes')
const userRoutes = require('../Back-End/Routes/User.Routes')
const URI = "mongodb+srv://sairakesh2494:090807@cluster0.qdg1ngi.mongodb.net/UsersData"



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/product',productroutes)
app.use('/user',userRoutes)

app.use('/',(req,res)=>{
    return res.status(200).json({
        message:'Server is Running'
    })
})

mongoose.connect(URI)
.then(()=>{
    app.listen(5001,()=>{
        console.log('The server isrunning on port 5001')
    })
})
.catch((err)=>{console.log('Unable to connect to server',err)})