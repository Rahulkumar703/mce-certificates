import User from "@/models/User";
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import bcrypt from 'bcrypt'
import signJWT from "@/lib/signJWT";

dbConnect()

export async function POST(req) {
    try {

        const reqBody = await req.json();
        const { email, password, rememberMe = false } = reqBody;

        const EXPIRATION_TIME = rememberMe ? '15d' : '7d';

        // ============= Check if User Exist =============

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return NextResponse.json(
                { message: "Please create an account first.", type: "error", success: false },
                { status: 404 }
            )
        }

        // ============= Check if User Exist =============


        // ============= Matching the Password =============

        const dbPassword = user.password;
        const passwordMatched = await bcrypt.compare(password, dbPassword);

        // ============= Matching the Password =============


        if (passwordMatched) {

            // ============= Creating the JWT Token =============

            const token = await signJWT({ id: user._id, firstName: user.firstName, lastName: user.lastName }, EXPIRATION_TIME);

            // ============= Creating the JWT Token =============



            // ============= Updating Token in DB =============

            // const updateToken = await query({
            //     query: "UPDATE users SET token = ? WHERE id = ?",
            //     values: [token, user[0].id]
            // })

            // ============= Updating Token in DB =============

            const response = NextResponse.json(
                { message: "login successfull", type: "success", success: true, user: { id: user._id, firstName: user.firstName, lastName: user.lastName } },
                { status: 200 }
            )

            // ============= Setting Cookie =============

            response.cookies.set({
                name: 'auth',
                value: token,
                maxAge: rememberMe ? 60 * 60 * 24 * 15 : 60 * 60 * 24 * 7,
                httpOnly: true,
                sameSite: 'strict',
            })

            // ============= Setting Cookie =============

            return response;
        }
        else {
            return NextResponse.json(
                { message: "Please check your credentials.", type: "error", success: false },
                { status: 500 }
            )
        }

    } catch (error) {
        console.table(error);
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }
}