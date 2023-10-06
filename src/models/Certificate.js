import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, "student is required"],
        trim: true,
        lowercase: true
    },
    certificateNo: {
        type: String,
        required: [true, "Certificate No. is required"],
        trim: true,
    },
    certificateCategory: {
        type: String,
        required: [true, "Certificate No. is required"],
        trim: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



const Certificate = mongoose.models.certificate || mongoose.model('certificate', CertificateSchema);
export default Certificate;