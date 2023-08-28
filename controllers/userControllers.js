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

    const payload = {
        id: newUser._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
    await User.findByIdAndUpdate(newUser._id, { token });
 
    res.status(201).json({
        user: {
            _id,
            name,
            email,
            theme: newUser.theme,
            photo: newUser.photo 
        },
        token
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
        res.status(401).json({ message: 'This user is logged' });
        return;
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        user: {
          _id: user._id,
          email,
          theme: user.theme,
          photo: user.photo
        },
        token
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({message: "No content"})
}

const update = async (req, res) => {
    const { name, email, password, photo } = req.body;
    const { _id } = req.params;
    const user = await User.findById(_id);

    if (!user) {
        res.status(401).json({ message: `User with ${_id} not found` });
        return;
    } 
    
    const hashPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(_id, { email, name, password: hashPassword, photo }, { new: true });
    
    res.status(200).json({
        user: {
            _id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            theme: user.theme,
            photo: updatedUser.photo
        }
    });
}

const updateTheme = async (req, res) => {
    const { theme } = req.body;
    const { _id } = req.params;
   
    await User.findByIdAndUpdate(_id,  {theme:theme}, {new:true} );
    res.status(200).json({
        _id,
        theme
    })
}

const uploadPhoto = async (req, res) => {
  try {
    const cloudinaryImageUrl = req.file.path;
    res.status(200).json({cloudinaryImageUrl});
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Error' });
  }
};

const updatePhoto = async (req, res) => {
  try {
    const { _id } = req.params;
    const cloudinaryImageUrl = req.file.path;
    const updatedUser = await User.findByIdAndUpdate({ _id }, { avatar: cloudinaryImageUrl }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User is not found' });
    }
    res.status(200).json({ message: 'Avatar updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Error' });
  }
};

export default {
    register,
    login,
    logout,
    update,
    updateTheme,
    uploadPhoto,
    updatePhoto,
}
