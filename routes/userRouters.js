import express from 'express';
import userControllers from '../controllers/userControllers.js';
import userValidators from '../middlewars/user/userValidators.js';
// import passport from '../middlewars/user/google-authenticate.js'


const userRouter = express.Router();

// userRouter.get('/google', passport.authenticate('google', { scope: ["email", "profile"] }));

// userRouter.get('/google/callback', passport.authenticate('google', {session : false}), userControllers.googleAuth)

userRouter.post('/register', userValidators.isEmptyBody, userValidators.userRegisterValidator, userControllers.register);

userRouter.post('/login', userValidators.isEmptyBody, userValidators.userLoginValidator, userControllers.login);

// userRouter.post('/refresh',  userControllers.refresh)

userRouter.post('/logout', userValidators.authenticate, userControllers.logout);

userRouter.get('/current', userValidators.authenticate, userControllers.current);

userRouter.put('/:id/update', userValidators.isEmptyBody, userValidators.isValidId, userValidators.authenticate, userValidators.userUpdateValidator,  userControllers.update);

userRouter.patch('/:id/theme', userValidators.isEmptyBody, userValidators.isValidId, userValidators.authenticate, userValidators.isTheme, userControllers.updateTheme);

// userRouter.patch('/:id/photo',userValidators.userUpdatePhoto, uploadCloud.single('photo'), userControllers.updatePhoto);

userRouter.post('/letter',  userValidators.isEmptyBody, userControllers.letter )


export default userRouter;