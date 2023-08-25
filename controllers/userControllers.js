import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/user.js'
// import HttpError from "../helpers/httpError.js";

dotenv.config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.status(409).json({ message: 'Email in use' });
        return;
        // throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    
    const payload = {
        id: newUser._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(200).json({
        email,
        token
    })
}

export default {
    register
}
