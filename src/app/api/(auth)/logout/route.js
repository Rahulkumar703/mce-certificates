import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

dbConnect()

export async function GET() {

    try {
        const response = NextResponse.json(
            { message: "loggedOut successfully", type: "success", success: true },
            { status: 200 }
        )
        response.cookies.set({
            name: 'auth',
            value: '',
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict',
        })

        return response;

    } catch (error) {
        console.table(error)
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }



}