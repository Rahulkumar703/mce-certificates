import bcrypt from 'bcrypt'
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name can't be empty"],
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, "last name can't be empty"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "mobile number is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please set a Password"],
        select: false
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

const User = mongoose.models.user || mongoose.model('user', UserSchema);
export default User;