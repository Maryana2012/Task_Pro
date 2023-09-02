import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    name: {
        type:String,
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type:String
    },
    theme: {
        type: String,
        enum: ['dark', 'light', 'violet'],
        default: 'dark'
    },
    photo: {
        type: String,
    }

}, { versionKey: false, timestamps: true  })

const User = model("user", userSchema);

export default User;