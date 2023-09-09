import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    let pathname = request.nextUrl.pathname
    console.log(pathname)
    let token = request.cookies.get('next-auth.session-token')

    const publicPath = pathname === '/'

    if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

}

export const config =
{
    matcher: [
        '/',
        '/profile/:path*',
        '/update-prompt/:path*',
        '/create-prompt/:path*'
    ]
}