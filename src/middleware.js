import { NextResponse } from "next/server";

const middleware = async (request) => {
    const { pathname } = request.nextUrl

    const token = request.cookies.get('auth')?.value;
    const publicUrl = pathname === '/login' || pathname === '/signup' || pathname === '/'

    if (token && publicUrl) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (!token && !publicUrl) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return;
}

export const config = {
    matcher: ['/', '/dashboard', '/dashboard/:path*', '/issue/:path*', '/issued/:path*', '/login', '/signup'],
}

export default middleware