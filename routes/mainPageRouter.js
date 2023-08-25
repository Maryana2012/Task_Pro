import express from 'express';

const mainPageRouter = express.Router();

mainPageRouter.get('/', ()=>{console.log('Hello')});

export default mainPageRouter;