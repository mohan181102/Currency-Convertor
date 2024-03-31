import { connect } from "@/dbconnect/dbconnect";
import User from "@/models/user.model";
import {NextResponse, NextRequest} from 'next/server'
import bcryptjs from "bcrypt"
import jwt from "jsonwebtoken"

connect()

export const getdatafromtoken = (req)=>{
    try {
        const token = req.cookies.get("token")?.value || ""
        const data = jwt.verify(token,process.env.SECRET_KEY)
        if(data){
            return data.id
        }
    } catch (error) {
        return (
            NextResponse.json({
                error:"Something went wrong"
            })
        )
    }
}