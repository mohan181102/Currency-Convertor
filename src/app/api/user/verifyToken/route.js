import { connect } from "@/dbconnect/dbconnect";
import User from "@/models/user.model";
import {NextResponse, NextRequest} from 'next/server'

connect()

export async function POST(NextRequest){
    try {
        const reqBody = await NextRequest.json()
        const { token } = reqBody
        
        console.log(token)
        
        const user = await User.findOne({verifyToken:token, verifyTokenExpry:{$gt:Date.now()}})
    
        if(!user){
            return (
                NextResponse.json({
                    error:"Invalid token"
                })
            )
        }

        console.log(user)

        user.isVerify=true
        user.verifyToken=undefined
        user.verifyTokenExpry=undefined

        const verifyuser = await user.save()

        console.log(verifyuser)
        return (
            NextResponse.json({
                message:"Verify succesfully"
            })
        )
    } catch (error) {
        return NextResponse.json({
            error:error.message
        })
    }
}