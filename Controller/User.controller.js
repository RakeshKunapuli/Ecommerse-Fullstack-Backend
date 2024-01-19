const User = require('../Model/User.model')
const validator = require('validator')
const bcrypt = require('bcryptjs');



module.exports.signUp = async (req,res)=>{
    try{
        const {firstname,lastname,email,password,address,mobileno} = req.body
        if(!firstname || !lastname || !email || !password || !address || !mobileno){
return res.status(400).json({
    msg:'All Fields Are required'
})
        }

        const emailcheck = await User.findOne({email:email})
        if(emailcheck){
            return res.status(400).json({
                msg:"Email Already exists",
                email:emailcheck
            })
        }

        const emailValidation = validator.isEmail(email)
        if(!emailValidation){
            return res.status(404).json({
                msg:'Provide a Correct email',
                email:email
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            firstname,
            lastname,
            email,
            password:hashedPassword,
            address,
            mobileno
        })

        await newUser.save()

        return res.status(200).json({
            msg:"New User Created Successfully",
            new:newUser
        })

    }catch(err){
        return res.status(500).json({
            msg:"Internal Server Error",err
        })
    }
}

module.exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body
     
        if(!email || !password){
            return res.status(404).json({
                msg:"All fields are required",
                email:email
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                msg: "Invalid email format."
            });
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                msg:"Invalid Credentials",
                email:email
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                msg:"Invalid Credeantials"
            })
        }

        return res.status(200).json({
            msg:"Login Succesfull",
            data:email
        })

    }catch(err){
        return res.status(500).json({
            msg:"Internal server Error",
            error:err
        })
    }
}