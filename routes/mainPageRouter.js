import express from 'express';

const mainPageRouter = express.Router();

mainPageRouter.get('/');

export default mainPageRouter;