import express from 'express';
import taskControllers from '../controllers/taskControllers.js' 

const taskRouter = express.Router();

taskRouter.post('/board', taskControllers.boardCreate);
taskRouter.post('/board/:_id/column', taskControllers.columnCreate);
// taskRouter.get('/tasks');
// taskRouter.post('/tasks');
// taskRouter.put('/tasks/${idTask}');
// taskRouter.delete('/tasks/${idTask}');
// taskRouter.patch('/tasks/${idTask}');

export default taskRouter;