import express from 'express';
import userControllers from '../controllers/userControllers.js';
import userValidators from '../middlewars/user/userValidators.js';
import passport from '../middlewars/user/google-authenticate.js';
import uploadCloud from '../middlewars/user/cloudinary.js';


const userRouter = express.Router();

userRouter.get('/google', passport.authenticate('google', { scope: ["email", "profile"] }));

userRouter.get('/google/callback', passport.authenticate('google', {session : false}), userControllers.googleAuth)

userRouter.post('/register', userValidators.isEmptyBody, userValidators.userRegisterValidator, userControllers.register);

userRouter.post('/login', userValidators.isEmptyBody, userValidators.userLoginValidator, userControllers.login);

userRouter.post('/refresh',  userControllers.refresh)

userRouter.post('/logout', userValidators.authenticate, userControllers.logout);

userRouter.get('/current', userValidators.authenticate, userControllers.current);

userRouter.put('/update', userValidators.isEmptyBody,  userValidators.userUpdateValidator, userControllers.update);

userRouter.patch('/theme', userValidators.isEmptyBody, userValidators.authenticate, userValidators.isTheme, userControllers.updateTheme);

userRouter.patch('/photo', uploadCloud.single('photo'), userValidators.authenticate, userControllers.updateUserPhoto);

userRouter.post('/letter', userValidators.isEmptyBody, userValidators.userLetter, userControllers.letter);

export default userRouter;