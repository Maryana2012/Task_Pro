import express from 'express';

import taskControllers from '../controllers/taskControllers.js';
import userValidators from '../middlewars/user/userValidators.js';
import taskValidators from '../middlewars/tasks/taskValidators.js';

const taskRouter = express.Router();

taskRouter.get("/:boardId", userValidators.authenticate, taskControllers.getAllTasks);

taskRouter.post("/", userValidators.authenticate, userValidators.isEmptyBody, taskValidators.taskValidator, taskControllers.addTask);

taskRouter.put("/:taskId", userValidators.authenticate, userValidators.isEmptyBody, taskValidators.taskValidator, taskControllers.updateTask);

taskRouter.delete("/:taskId", userValidators.authenticate, taskControllers.deleteTask);

taskRouter.patch("/:taskId/move", userValidators.authenticate, userValidators.isEmptyBody, taskValidators.moveTask, taskControllers.moveTask);

taskRouter.get("/filter", userValidators.authenticate, userValidators.isEmptyBody, taskValidators.isPriority, taskControllers.getTasksByPriority);

export default taskRouter;