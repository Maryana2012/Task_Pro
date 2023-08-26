import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/user.js'
// import HttpError from "../helpers/httpError.js";

dotenv.config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.status(409).json({ message: 'Email in use' });
        return;
        // throw HttpError(409, "Email in use")

    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword, photo: "" });
    console.log(newUser)
    const payload = {
        id: newUser._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
    await User.findByIdAndUpdate(newUser._id, { token });
 
    res.status(200).json({
        user: {
            email,
            name,
            theme: newUser.theme,
            photo: newUser.photo 
        },
        token,
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
 
    if (!user) {
        res.status(401).json({ message: 'Email or password wrong' });
        return;
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        res.status(401).json({ message: 'Email or password wrong' });
        return;
    } 
    if (user.token) {
        res.status(401).json({ message: 'This user are logged ' });
        return;
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        user: {
          email,
          theme: user.theme  
        },
        token,
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({message: "No content"})
}

const update = async (req, res) => {
    const { photo, name, email, password } = req.body;
    const { _id } = req.params;
    const user = await User.findById(_id);

    if (!user) {
        res.status(401).json({ message: ` user with ${_id} not found` });
        return;
    } 
    const hashPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(_id,
         {
         email,
         name,
         password:hashPassword, 
         photo,  
        }, { new: true });
    res.status(200).json({
        user: {
            email: updatedUser.email,
            name: updatedUser.name,
            password: updatedUser.password,
            photo: updatedUser.photo,
            theme: user.theme
        }
    });

}

export default {
    register,
    login,
    logout,
    update
}
