import Certificate from "@/models/Certificate";
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'


dbConnect()

export async function POST(req) {
    try {

        const reqBody = await req.json();


        const res = await Certificate.findOne({ certificateCategory: { $regex: "^MCE/I-SIH'23" } }, {}, { sort: { certificateNo: -1 } });

        const certificateNo = res?.certificateNo || 0;

        let insertingData = reqBody.map((body, index) => {
            return {
                certificateNo: certificateNo + index + 1,
                studentName: body.name,
                teamName: body.team,
                certificateCategory: "MCE/I-SIH'23",
            }
        })

        const insertedCertificate = await Certificate.insertMany(insertingData);

        let result = insertedCertificate.map((body, index) => {
            const certificateNo = body.certificateNo < 10 ? `0${body.certificateNo}` : `${body.certificateNo}`
            return {
                id: `${body.certificateCategory}/${certificateNo}`,
                name: body.studentName,
                team: body.teamName,
                category: body.certificateCategory,
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