import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(NextRequest) {
    const path = NextRequest.nextUrl.pathname
    console.log("from middlew",path)
    const ispublic = path =='/login'|| path == '/signup'
    const token = NextRequest.cookies.get('token')?.value || ''

    console.log("from middleware:- ",token)

    if(ispublic && token ){
       
        return NextResponse.redirect(new URL('/profile', NextRequest.url))
    }

    if(!ispublic && !token){
        
        return NextResponse.redirect(new URL('/login', NextRequest.url))

    }

 

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile'
  ],
}