import { connect } from "@/dbconnect/dbconnect";
import User from "@/models/user.model";
import {NextResponse, NextRequest} from 'next/server'
import bcryptjs from "bcrypt"
import { sendEmail } from "@/helper/helper";
import { config, uploader } from 'cloudinary';

connect()

export async function POST(NextRequest){

    try {
        const req = await NextRequest.json();
        const {id, image} = req
        console.log("image:- ",image)

        const userforupdate = await User.findByIdAndUpdate({id},{profilephoto:image})

        if(!userforupdate){
            return NextResponse.json({
                message:"image not found!",
            },{status:401})
        }
        
        if(!image){
            return NextResponse.json({
                message:"image not found!",
            },{status:401})
        }

        if(userforupdate){
            return NextResponse.json({
                message:"Profile photo update successfully!",
            },{status:200})
        }
        
    } catch (error) {
        return NextResponse.json({
            message:"Something went wrong",
        },{status:500})     
    }



    

    
}