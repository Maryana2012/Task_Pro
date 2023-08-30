import express from 'express';

import taskControllers from '../controllers/taskControllers.js';

import userValidators from '../middlewars/user/userValidators.js';

const taskRouter = express.Router();

// Маршрут для отримання всіх тасків на дошці
taskRouter.get("/", userValidators.authenticate, taskControllers.getAllTasks);

// Маршрут для додавання нового таска на дошку
taskRouter.post("/", userValidators.authenticate, taskControllers.addTask);

// Маршрут для оновлення інформації про таск
taskRouter.put("/:taskId", userValidators.authenticate, taskControllers.updateTask);

// Маршрут для видалення таска з дошки
taskRouter.delete("/:taskId", userValidators.authenticate, taskControllers.deleteTask);

// Маршрут для переміщення таски в іншу колонку
taskRouter.patch("/:taskId/move/:newColumnId", userValidators.authenticate, taskControllers.moveTask);

// Маршрут фільтрації тасок з певним пріоритетом на дошці
taskRouter.get("/:boardId/:priority", userValidators.authenticate, taskControllers.getTasksByPriority);

export default taskRouter;