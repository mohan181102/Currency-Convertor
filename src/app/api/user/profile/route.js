import { connect } from "@/dbconnect/dbconnect";
import User from "@/models/user.model";
import {NextResponse, NextRequest} from 'next/server'
import { getdatafromtoken } from "@/helper/getToken";

connect()


export async function POST(NextRequest){
    try {
        const id = await getdatafromtoken(NextRequest)
    
        if(id){
            const user = await User.findById(id).select("-password")
            console.log(user)
            return (
                NextResponse.json({
                    user
                })
            )
        }

        return NextResponse.json({
            error:"invalid token! "
        })
    } catch (error) {
        NextResponse.json({
            message:error.message
        })
    }
}