import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from "nodemailer";

import User from '../models/user.js'

dotenv.config();

const {ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, UKR_NET_EMAIL, UKR_NET_PASSWORD, FRONTENT_BASE_URL} = process.env;

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.status(409).json({ message: 'Email in use' });
        return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword, photo: "" });
    
    const payload = {
        id: newUser._id
    }
    // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
    // await User.findByIdAndUpdate(newUser._id, { token });

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "1m" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
    await User.findByIdAndUpdate(newUser._id, { accessToken,  refreshToken});
 
    res.status(201).json({
        user: {
            id: newUser._id,
            name,
            email,
            theme: newUser.theme,
            photo: newUser.photo 
        },
        // token
        accessToken,
        refreshToken
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
    // if (user.token) {
    //     res.status(401).json({ message: 'This user is logged' });
    //     return;
    // }

    const payload = {
        id: user._id
    }
    // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
    // await User.findByIdAndUpdate(user._id, { token });
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2m" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken  });
    res.status(200).json({
        user: {
          id: user._id,
          email,
          theme: user.theme,
          photo: user.photo
        },
        // token
        accessToken,
        refreshToken
    })
}

const refresh = async (req, res) => {
    const { refreshToken: token } = req.body;
   
    try {
        const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
        const isExist = await User.findOne({ refreshToken: token });
       
        if (!isExist) {
            res.status(403).json({ message: "Token invalid" });
            return
        }
        const payload = {
             id
        }
        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2m" });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
        await User.findByIdAndUpdate(isExist._id, { accessToken, refreshToken });
        res.status(200).json({
            accessToken,
            refreshToken
        })

    } catch (error) {
        res.status(403).json({ message: error.message });
        return;
    }
}

const googleAuth = async (req, res) => {
    const { _id: id } = req.user;
    const payload = {
        id
    }
    const user = req.user;
   const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2m" });
   const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
   await User.findByIdAndUpdate(id, { accessToken,  refreshToken});

    res.redirect(`${FRONTENT_BASE_URL}/auth/register?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${user}`)

}

const logout = async (req, res) => {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { accessToken: "" });
    // await User.findByIdAndUpdate(id, { token: "" });
    res.status(204).json({message: "No content"})
}

const current = async (req, res) => {
    const { email } = req.user;
    const user = await User.findOne({ email });

    res.status(200).json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            theme: user.theme,
            photo: user.photo 
        },
        accessToken: user.accessToken
        });
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const cloudinaryImageUrl = req.file.path;
   console.log(name)
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
        }, accessToken
    });
}

const updateTheme = async (req, res) => {
    const { theme } = req.body;
    const { id } = req.params;
   
    const user = await User.findByIdAndUpdate(id, { theme: theme }, { new: true });
 
    if (!user) {
        res.status(401).json({ message: `User with ${id} not found` });
        return;
    }
    res.status(200).json({
        id,
        theme
    })
}

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
    refresh,
    googleAuth,
    logout,
    current,
    update,
    updateTheme,
    letter
}
