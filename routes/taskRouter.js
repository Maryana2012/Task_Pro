import express from 'express';
import taskControllers from '../controllers/taskControllers.js' 

const taskRouter = express.Router();

taskRouter.post('/board', taskControllers.boardCreate);
taskRouter.post('/board/:_id/column', taskControllers.columnCreate);



export default taskRouter;