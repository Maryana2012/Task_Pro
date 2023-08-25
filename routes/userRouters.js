import express from 'express';
import userControllers from '../controllers/userControllers.js'

const userRouter = express.Router();

userRouter.post('/register', userControllers.register);

userRouter.post('/login', userControllers.login);

userRouter.post('/logout');



export default userRouter;