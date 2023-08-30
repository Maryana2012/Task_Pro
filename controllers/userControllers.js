import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from "nodemailer";

import User from '../models/user.js'

dotenv.config();

const { SECRET_KEY, UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

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
            id: newUser._id,
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
          id: user._id,
          email,
          theme: user.theme,
          photo: user.photo
        },
        token
    })
}

const logout = async (req, res) => {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { token: "" });
    res.status(204).json({message: "No content"})
}

const current = async (req, res) => {
    const { email } = req.user;
    const user = await User.findOne({ email });

    if (!user.token) {
        res.status(400), json({ message: error.message })  
        return;   
    }
    res.status(200).json({ user });
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const cloudinaryImageUrl = req.file.path;
   
    const user = await User.findById(id);

    if (!user) {
        res.status(401).json({ message: `User with ${id} not found` });
        return;
    } 
    const hashPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(id, { email, name, password: hashPassword, photo: cloudinaryImageUrl}, { new: true });
    
    res.status(200).json({
        user: {
            id,
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
    const { id } = req.params;
   
    await User.findByIdAndUpdate(id,  {theme:theme}, {new:true} );
    res.status(200).json({
        id,
        theme
    })
}

// const updatePhoto = async (req, res) => {
//   try {
//       const { id } = req.params;
//      const cloudinaryImageUrl = req.file.path;
//       console.log(cloudinaryImageUrl)

//     const updatedUser = await User.findByIdAndUpdate( id , { photo: cloudinaryImageUrl }, { new: true });
//       res.status(200).json({
//           id,
//           photo: updatedUser.photo
//       })
//   } catch (error) {
//     console.error(error);
//       res.status(404).json({ message: message.error });
//       return;
//   }
// };


const letter = async (req, res) => {
    const {email , text} = req.body;
      
    const nodemailerConfig = {
        host: "smtp.ukr.net",
        port: 465,
        secure: true,
        auth: {
           user: UKR_NET_EMAIL,
           pass: UKR_NET_PASSWORD
        }
    }
    const transport = nodemailer.createTransport(nodemailerConfig);
    const emailConfig = {
        from: UKR_NET_EMAIL,
        to: "taskpro.project@gmail.com",
        subject: "helper letter",
        html: `<p>${text}</p><p>Send answer to email ${email}</p>`
    }
    
    transport.sendMail(emailConfig)
        .then(() => {
            res.status(200).json({message: "Letter sent"})
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        })
}

export default {
    register,
    login,
    logout,
    current,
    update,
    updateTheme,
    // uploadPhoto,
    // updatePhoto,
    letter
}
