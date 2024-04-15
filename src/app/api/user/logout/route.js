import { connect } from "@/dbconnect/dbconnect";
import {NextResponse, NextRequest} from 'next/server' 

connect()

export async function GET(NextRequest){
    try {
        const response = NextResponse.json({
            message:"logout success!",
        })
        response.cookies.set("token","",{
            httpOnly:true
        })
        return(
            response
        )
    } catch (error) {
        return (
            NextResponse.json({
                message:"something went wrong",
                error:error.message,
                status:404,            
            },{status:401, statusText:"failed"})
        )
    }    
}