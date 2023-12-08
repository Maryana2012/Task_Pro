import express from 'express';

import taskSchema from '../schemas/taskSchemas.js';
import taskControllers from '../controllers/taskControllers.js';
import userValidators from '../middlewars/user/userValidators.js';
import taskValidators from '../middlewars/tasks/taskValidators.js';
import { isEmptyBody } from '../middlewars/validatorEmptyBody.js';
import { validateBody } from '../middlewars/validatorBody.js';
const taskRouter = express.Router();

taskRouter.get("/:boardId", userValidators.authenticate, taskControllers.getAllTasks);

taskRouter.post("/", userValidators.authenticate, isEmptyBody, validateBody(taskSchema), taskControllers.addTask);

taskRouter.put("/:taskId", userValidators.authenticate, isEmptyBody, validateBody(taskSchema), taskControllers.updateTask);

taskRouter.delete("/:taskId", userValidators.authenticate, taskControllers.deleteTask);

taskRouter.patch("/:taskId/move", userValidators.authenticate, isEmptyBody, taskControllers.moveTask);

taskRouter.get("/:boardId/:priority", userValidators.authenticate, taskControllers.getTasksByPriority);

export default taskRouter;