import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isValidObjectId } from "mongoose";

import userSchema from '../../schemas/userSchema.js';
import User from '../../models/user.js';


dotenv.config();
const { SECRET_KEY } = process.env;

const isEmptyBody = (req, res, next) => {
    const keys = Object.keys(req.body);
     if (keys.length === 0) {
       res.status(400).json({ message: 'missing fields' });
       return
    }
    next();
}

const userRegisterValidator = (req, res, next) => {
  const { error } = userSchema.userRegisterSchema.validate(req.body);
   if (error) {
      if (error.details[0].type === "any.required") {
        res.status(400).json({ message: `missing required ${error.details[0].path[0]} field` });
        return;
      } else if (error.details[0].type.includes('base')) {
        res.status(400).json( message.error );
        return;
      }
  }
  next();
}  

const userLoginValidator = (req, res, next) => {
  const { error } = userSchema.userLoginSchema.validate(req.body);
   if (error) {
     if (error.details[0].type === "any.required") {
         console.log('error')
           res.status(400).json({ message: `missing required ${error.details[0].path[0]} field` });
           return;
        } else if (error.details[0].type.includes('base')) {
           res.status(400).json( message.error);
           return;
      }
  }
  next();
}

const authenticate = async (req, res, next) => {
    const { authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        res.status(401).json({ message: `Not authorized` });
        return;
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
       
        if (!user || !user.token) {
            res.status(401).json({ message: `Not authorized` });
            return;
      }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message });
        return;
    }
}

const refreshToken = (req, res, next) => {
  const { error } = userSchema.userRefreshSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message});
    return;
  }
  next();
} 

const isValidId = (req, res, next) => {
    const {id } = req.params;
    if (!isValidObjectId(id)) {
        return next( res.status(404).json({message: `${id} is not valid`}));
    }
    next();
}

const isTheme = (req, res, next) => {
  const { error } = userSchema.userThemeSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: 'select theme from [dark, light, violet]' });
    return;
  }
  next();
}

const userUpdateValidator = (req, res, next) => {
  const { error } = userSchema.userUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: 'select theme from [dark, light, violet]' });
    return;
  }
  next();
}

const userUpdatePhoto = (req, res, next) => {
  const { error } = userSchema.userPhotoSchema.validate(req);
  if (error) {
    res.status(400).json({ message: error.message  });
    return;
  }
  next();
}


export default {
  isEmptyBody,
  userRegisterValidator,
  userLoginValidator,
  authenticate,
  refreshToken,
  isValidId,
  isTheme,
  userUpdateValidator,
  userUpdatePhoto
}