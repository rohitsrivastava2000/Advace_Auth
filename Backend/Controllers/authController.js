import User from "../Model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "All Field Are Mandatory",
      });
    }

    const checkUserName = await User.findOne({ userName: userName });

    if (checkUserName) {
      return res.status(402).json({
        success: false,
        message: "User Name Already Exist, try another",
      });
    }

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(404).json({
        success: false,
        message: "User Already register, Please go for login",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const userData = new User({
      userName,
      email,
      password: hashPassword,
    });
    
    await userData.save();
    
    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    
    console.log("register")
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User Register Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error on Register Phase",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "All Field are Mandatory",
      });
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(402).json({
        success: false,
        message: "User is not Register",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(402).json({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User Login Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal Server Error on Login Phase"
    })
  }
};

export const logout=async(req,res)=>{
  try {
    res.clearCookie('token',{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })

    return res.status(200).json({
      success:true,
      message:"Logout Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal Server Error on Logout"
    })
  }
}