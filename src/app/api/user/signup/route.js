import { connect } from "@/dbconnect/dbconnect";
import User from "@/models/user.model";
import {NextResponse, NextRequest} from 'next/server'
import bcryptjs from "bcrypt"
import { sendEmail } from "@/helper/helper";

connect()

export async function POST(NextRequest){
    try {
        const reqBody = await NextRequest.json()
        const {email, username, password,  profilePhoto} = reqBody
        // VALIDATION
        
        console.log("body:- ",reqBody)

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({
                error:"user alredy exist"
            },{status:401})
        }
        
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            profilePhoto
        })
        
        const saveUser = await newUser.save()
        
        console.log(saveUser)
        
        // VALIDATION
        await sendEmail({email, emailType:"VERIFY", userId:saveUser._id})

        return NextResponse.json({
            message:"User registerd succesfully! ",
            data:saveUser
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error:error.message,             
        },{status:401, statusText:"Something went wrong!"})
    }
}