import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from "nodemailer";

import User from '../models/user.js';

dotenv.config();

const {ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, UKR_NET_EMAIL, UKR_NET_PASSWORD, FRONTENT_BASE_URL} = process.env;

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
    
        if (user) {
           return res.status(409).json({ message: 'Email in use' });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({...req.body, password: hashPassword, photo: "" });
        
        const payload = {
            id: newUser._id
        }
       
        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2m" });
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
            accessToken,
            refreshToken
        })
        
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
     
        if (!user) {
           return  res.status(401).json({ message: 'Email or password wrong' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return  res.status(401).json({ message: 'Email or password wrong' });
        } 
    
        const payload = {
            id: user._id
        }
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
            accessToken,
            refreshToken
        })
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const refresh = async (req, res) => {
    const { refreshToken: token } = req.body;
   
    try {
        const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
        const isExist = await User.findOne({ refreshToken: token });
       
        if (!isExist) {
            return  res.status(403).json({ message: "Token invalid" });
        }
        const payload = {id}

        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2m" });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
        await User.findByIdAndUpdate(isExist._id, { accessToken, refreshToken });
        res.status(200).json({
            accessToken,
            refreshToken
        })

    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}

const googleAuth = async (req, res) => {
    try {
        const { _id: id } = req.user;
        const payload = {id};
        const user = req.user;
    
        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2m" });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
        await User.findByIdAndUpdate(id, { accessToken,  refreshToken});
    
        res.redirect(`${FRONTENT_BASE_URL}/auth/register?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${user}`)  
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}

const logout = async (req, res) => {
    const { id } = req.user;
    try {
        await User.findByIdAndUpdate(id, { accessToken: "" });
        res.status(204).json({message: "No content"});  
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const current = async (req, res) => {
    const { email } = req.user;
    try {
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
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
};

const update = async (req, res) => {
    const { id } = req.user;
    const { name, email, password } = req.body;
    
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({ message: `User with ${id} not found` });
        }
        
        if(req.file.path !== 'undefined'){
            const cloudinaryImageUrl = req.file.path;
            await User.findByIdAndUpdate(id, {photo:cloudinaryImageUrl}, {new:true})
        }
        
        if(password !=='undefined'){
            const hashPassword = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(id, { password: hashPassword }, {new:true});
         }
      
        await User.findByIdAndUpdate(id, {name, email}, {new:true});
        const updateUser =await User.findById(id) 
        console.log(updateUser)

        res.status(200).json({ 
            name:updateUser.name,
            email:updateUser.email,
            photo: updateUser.photo,
            // theme: updateUser.theme,
            // accessToken: updateUser.accessToken,
            // refreshToken: updateUser.refreshToken,
        } );
        
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

// const updateUserPhoto = async (req, res) => {
//     const { id } = req.user;
//     try {
//         // if (!req.file) {
//         //     res.status(400).json({ message: `no files ` });
//         //     return;
//         // }
        // const imageFile = req.file;
//         const cloudinaryImageUrl = req.file.path;
//         console.log(cloudinaryImageUrl)
    
//         const user = await User.findById(id);
//         if (!user) {
//           return  res.status(401).json({ message: `User with ${id} not found` });
//         }
//         const newUser =  await User.findByIdAndUpdate(id, { photo: cloudinaryImageUrl }, {imageFile: imageFile}, {new:true});
//         res.status(200).json({newUser})
//     } catch (error) {
//         return res.status(404).json({ message: error.message });
//     }
// }

const updateTheme = async (req, res) => {
    const { theme } = req.body;
    const { id } = req.user;
    try {
        const user = await User.findByIdAndUpdate(id, { theme: theme }, { new: true });
     
        if (!user) {
            res.status(401).json({ message: `User with ${id} not found` });
            return;
        }
        res.status(200).json({
            id,
            theme
        })   
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ message: error.message });
    }
}

const letter = async (req, res) => {
    const {email , text} = req.body;
    try {
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
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}


export default {
    register,
    login,
    refresh,
    googleAuth,
    logout,
    current,
    update,
    // updateUserPhoto,
    updateTheme,
    letter
}
