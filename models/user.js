import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    token: String,

}, { versionKey: false })

const User = model("user", userSchema);

export default User;