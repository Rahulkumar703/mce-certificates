import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, "Make sure you write 'name' at the top of the column where you list the Participant names in the Excel file. And every row has a Participant."],
        trim: true,
        lowercase: true
    },
    teamName: {
        type: String,
        required: [true, "Make sure you write 'team' at the top of the column where you list the Team names in the Excel file. And every row has a Team Name."],
        trim: true,
        lowercase: true
    },
    certificateNo: {
        type: Number,
        required: [true, "Certificate No. is required"],
        trim: true,
        unique: true,
    },
    certificateCategory: {
        type: String,
        required: [true, "Certificate Category. is required"],
        trim: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



const Certificate = mongoose.models.certificate || mongoose.model('certificate', CertificateSchema);
export default Certificate;