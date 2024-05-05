import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please provide username"],
        unique:true
    },
    profilePhoto:{
        type:String,
        default:null,
        required:[false]
    },
    email:{
        type: String,
        required: [true, "Please provide email"],
        unique:true
    },
    password:{
        type: String,
        required: [true, "Please provide password"],
    },
    isVerify:{
        type: Boolean,
        default:false
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    ForgetPasswordToken:String,
    ForgetPasswordTokenExpry:Date,
    verifyToken:String,
    verifyTokenExpry:Date
})


const User = mongoose.models.users || mongoose.model("users",userschema)

export default User
