import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isValidObjectId } from "mongoose";

import userSchema from '../../schemas/userSchema.js';
import User from '../../models/user.js'

dotenv.config();
const { SECRET_KEY } = process.env;

const isEmptyBody = (req, res, next) => {
    const keys = Object.keys(req.body);
     if (keys.length === 0) {
        // throw HttpError(400, `missing fields`);
         res.status(400).json({ message: 'missing fields' });
    }
    next();
}

const userRegisterValidator = (req, res, next) => {
  const { error } = userSchema.userRegisterSchema.validate(req.body);
   if (error) {
      if (error.details[0].type === "any.required") {
        // throw HttpError(400, `missing required ${error.details[0].path[0]} field`); 
          res.status(400).json({ message: `missing required ${error.details[0].path[0]} field` });
          return
      } else if (error.details[0].type.includes('base')) {
        // throw HttpError(400, error.message); 
          res.status(400).json( message.error );
          return
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
        // throw HttpError(400, `missing required ${error.details[0].path[0]} field`); 
      } else if (error.details[0].type.includes('base')) {
        // throw HttpError(400, error.message); 
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
        // throw HttpError(401, `Not authorized`);
        res.status(401).json({ message: `Not authorized` });
        return;
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
       
        if (!user || !user.token) {
            // throw HttpError(401, `Not authorized`);
            res.status(401).json({ message: `Not authorized` });
            return;
      }
        req.user = user;
        next();
    }
    catch (error) {
        // throw HttpError(401, `Not authorized`);
        res.status(401).json({ message: `Not authorized` });
        return;
    }

}

const isValidId = (req, res, next) => {
    const {_id } = req.params;
    if (!isValidObjectId(_id)) {
        return next( res.status(404).json({message: `${_id} is not valid`}));
    }
    next();
}


export default {
  isEmptyBody,
  userRegisterValidator,
  userLoginValidator,
  authenticate,
  isValidId 
}