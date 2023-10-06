import dbConnect from '@/lib/dbConnect';
import verifyJWT from "@/lib/verifyJWT";
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

dbConnect()

export async function GET(req) {

    try {
        const token = req.cookies.get('auth')?.value;

        if (!token)
            return NextResponse.json(
                { message: 'unAuthenticated', type: "error", success: false },
                { status: 401 }
            )

        const payload = await verifyJWT(token);
        return NextResponse.json(
            { message: 'authenticated', type: "success", success: true, user: { id: payload.id, firstName: payload.firstName, lastName: payload.lastName } },
            { status: 200 }
        )

    } catch (error) {
        console.table(error)
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }



}