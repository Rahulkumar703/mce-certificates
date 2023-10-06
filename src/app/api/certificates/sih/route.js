import Certificate from "@/models/Certificate";
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'


dbConnect()

export async function POST(req) {
    try {

        const reqBody = await req.json();

        const res = await Certificate.findOne({ certificateCategory: { $regex: "^MCE/ISIH'23" } }, {}, { sort: { _id: -1 } });

        const certificateNo = res?.certificateNo || 0;


        let insertingData = reqBody.map((body, index) => {
            return {
                certificateNo: Number(certificateNo) + index + 1,
                studentName: body.name,
                certificateCategory: "MCE/ISIH'23",
            }
        })

        const insertedCertificate = await Certificate.insertMany(insertingData);

        let result = insertedCertificate.map((body, index) => {
            return {
                id: body.certificateNo,
                name: body.studentName,
                category: "MCE/ISIH'23",
            }
        })

        return NextResponse.json(
            { message: 'Certificate generated successfully', type: "success", success: true, certificates: result },
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