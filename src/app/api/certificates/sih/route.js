import Certificate from "@/models/Certificate";
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'


dbConnect()

export async function POST(req) {
    try {

        const reqBody = await req.json();
        const { certificateId, name } = reqBody

        await Certificate.create({ certificateNo: 'MCE/ISIH\'23/' + certificateId, studentName: name, certificateCategory: 'MCE/ISIH\'23' })

        return NextResponse.json(
            { message: 'Certificate generated successfully', type: "success", success: true },
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


export async function GET(req) {
    try {
        const certificates = await Certificate.find({ certificateCategory: { $regex: "^MCE/ISIH'23" } });

        return NextResponse.json(
            { message: 'Certificate fetched successfully', type: "success", success: true, certificates: certificates },
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