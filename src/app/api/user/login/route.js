import { connect } from "@/dbconnect/dbconnect";
import User from "@/models/user.model";
import {NextResponse, NextRequest} from 'next/server'
import bcryptjs from "bcrypt"
import jwt from "jsonwebtoken"

connect()

export async function POST(NextRequest){
    try {
        const reqBody = await NextRequest.json()
        const {email, password} = reqBody

        const user = await User.findOne({email})

        if(!user){
            return (
                NextResponse.json({
                    error:"User not found"
                })
            )
        }
        console.log(user)
 
        const validPassword = await bcryptjs.compare(password, user.password)

        if(validPassword==false){
            return (
                NextResponse.json({
                    error:"Check credentials"
                })
            )
        }

        const Tokendata = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const jwttoken = jwt.sign(Tokendata,process.env.SECRET_KEY,{expiresIn:"1d"})
       
        const response = NextResponse.json({
            message:"Loged In"
        })

        response.cookies.set("token",jwttoken,{
            httpOnly:true
        })

        return response
        
    } catch (error) {
        return NextResponse.json({
            error:"Invalid credentials",
        })
    }
}
