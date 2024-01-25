const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        mobileno:{
            type:Number,
            required:true,
            unique:true
        }

},{
    timestamps:true
}
)

const User = mongoose.model('signup',UsersSchema)
module.exports = User