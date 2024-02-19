const User = require("../Model/User.model");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.signUp = async (req, res)=>{
    try {
    const { firstname, lastname, email, password, address, mobileno } =
      req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !address ||
      !mobileno
    ) {
      return res.status(400).json({
        msg: "All Fields Are required",
        
      });
    }

    const emailcheck = await User.findOne({ email: email });
    if (emailcheck) {
      return res.status(400).json({
        msg: "Email Already exists",
        email: emailcheck,
      });
    }

    const emailValidation = validator.isEmail(email);
    if (!emailValidation) {
      return res.status(404).json({
        msg: "Email format is not Correct",
        email: email,
      });
    }

    const mobilenoCheck = await User.findOne({mobileno:mobileno})
    if(mobilenoCheck){
      return res.status(400).json({
        msg: "Mobile No Already exists",
        mobileno:mobilenoCheck,
      });
    }

    if(password.length < 6){
        return res.status(404).json({
            msg: "The Passowrd Length should be minimum 6",
            email: email,
          });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      address,
      mobileno,
    });

    await newUser.save();

    return res.status(200).json({
      msg: "New User Created Successfully",
      new: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Internal Server Error",
      err,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        msg: "All fields are required"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        msg: "Invalid email format.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "Invalid Credentials",
        email: email,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid Credeantials",
        password:"Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JSON_TOKEN_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "login succesfull",
      email: user.email,
      name: `${user.firstname} ${user.lastname}`,
      id: user._id,
      token,
    });
    
  } catch (err) {
    return res.status(500).json({
      msg: "Internal server Error",
      error: err,
    });
  }
};

module.exports.allusers = async (req,res)=>{
  try{

    const users = await User.find()
    return res.status(200).json({
      msg:"All Users re fetched",
      data:users
    })

  }catch(err){
    return res.status(500).json({
      msg:"Internal Server Error"
    })
  }
}
