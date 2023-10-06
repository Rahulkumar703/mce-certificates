
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import User from "@/models/User";

dbConnect()

export async function POST(req) {
    try {

        const reqBody = await req.json();
        const { firstName, lastName, email, phone, password } = reqBody;


        // ============= Check if User Exist =============
        const user = await User.findOne({ '$or': [{ email }, { phone }] });

        if (user) {
            return NextResponse.json(
                { message: "You are already registered please Login", type: "info", success: false },
                { status: 409 }
            )
        }
        // ============= Check if User Exist =============



        // ============= Inserting the User =============
        await User.create({ firstName, lastName, email, phone, password });
        // ============= Inserting the User =============

        return NextResponse.json(
            { message: "Registration done, please login.", type: "success", success: true },
            { status: 200 }
        )

    } catch (error) {
        console.log(error);
        console.table(error)
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }
}