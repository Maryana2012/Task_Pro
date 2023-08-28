import express from 'express';

import userValidators from '../middlewars/user/userValidators.js'
import boardsController from '../controllers/boardsController.js';

const boardsRouter = express.Router();

boardsRouter.get("/", userValidators.authenticate,  boardsController.getAllBoards);

boardsRouter.get("/:boardId", userValidators.authenticate, boardsController.getBoard);

boardsRouter.post("/", userValidators.authenticate, boardsController.addBoard);

boardsRouter.put("/:boardId", userValidators.authenticate, boardsController.updateBoard);

boardsRouter.delete("/:boardId", userValidators.authenticate, boardsController.deleteBoard);

boardsRouter.post('/:boardId/columns', userValidators.authenticate, boardsController.addColumn);

boardsRouter.patch('/:boardId/columns/:columnId', userValidators.authenticate, boardsController.updateColumn);

boardsRouter.delete('/:boardId/columns/:columnId', userValidators.authenticate, boardsController.deleteColumn);

export default boardsRouter;