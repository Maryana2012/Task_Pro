import express from 'express';
import userControllers from '../controllers/userControllers.js';
import userValidators from '../middlewars/user/userValidators.js'
import uploadCloud from '../middlewars/user/cloudinary.js'

const userRouter = express.Router();

userRouter.post('/register', userValidators.isEmptyBody, userValidators.userRegisterValidator, userControllers.register);

userRouter.post('/login', userValidators.isEmptyBody, userValidators.userLoginValidator, userControllers.login);

userRouter.post('/logout', userValidators.authenticate, userControllers.logout);

userRouter.put('/:id/update', userValidators.isEmptyBody, userValidators.isValidId, userControllers.update);

userRouter.patch('/:id/theme', userValidators.isEmptyBody, userValidators.isValidId, userValidators.isTheme, userControllers.updateTheme);

userRouter.post('/:_id/avatar', userValidators.authenticate, uploadCloud.single('photo'), userControllers.uploadPhoto);

userRouter.patch('/:_id/avatar', userValidators.authenticate, uploadCloud.single('photo'), userControllers.updatePhoto);

userRouter.post('/letter',  userValidators.isEmptyBody, userValidators.authenticate, userControllers.letter )


export default userRouter;