import express from 'express';

import schema from '../schemas/userSchema.js'
import userValidators from '../middlewars/user/userValidators.js';
import passport from '../middlewars/user/google-authenticate.js';
import uploadCloud from '../middlewars/user/cloudinary.js';
import { validateBody } from '../middlewars/validatorBody.js';
import { isEmptyBody } from '../middlewars/validatorEmptyBody.js';
import userControllers from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.get('/google', passport.authenticate('google', { scope: ["email", "profile"] }));

userRouter.get('/google/callback', passport.authenticate('google', {session : false}), userControllers.googleAuth)

userRouter.post('/register', isEmptyBody, validateBody(schema.userRegisterSchema), userControllers.register);

userRouter.post('/login', isEmptyBody, validateBody(schema.userLoginSchema), userControllers.login);

userRouter.post('/refresh',  userControllers.refresh);

userRouter.post('/logout', userValidators.authenticate, userControllers.logout);

userRouter.get('/current', userValidators.authenticate, userControllers.current);

userRouter.patch('/update',  userValidators.authenticate, uploadCloud.single('photo'), validateBody(schema.userUpdateSchema), userControllers.update);

userRouter.patch('/theme',  userValidators.authenticate, userValidators.isTheme, userControllers.updateTheme);

userRouter.post('/letter', isEmptyBody, userValidators.userLetter, userControllers.letter);

export default userRouter;