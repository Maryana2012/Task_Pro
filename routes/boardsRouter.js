import express from 'express';

import userValidators from '../middlewars/user/userValidators.js'
import boardsController from '../controllers/boardsController.js';

const boardsRouter = express.Router();

boardsRouter.get("/", userValidators.authenticate,  boardsController.getAllBoards);

boardsRouter.get("/:boardId", userValidators.authenticate, boardsController.getBoard);

boardsRouter.post("/", userValidators.authenticate, boardsController.addBoard);

// boardsRouter.put("/:boardId", boardsController.updateBoard);

// boardsRouter.delete("/:boardId", boardsController.deleteBoard);

// boardsRouter.post('/:boardId/columns', boardsController.addColumnInBoard);

// boardsRouter.patch('/:boardId/columns/:columnId', boardsController.updateColumnInBoard);

// boardsRouter.delete('/:boardId/columns/:columnId', boardsController.deleteColumnInBoard);

export default boardsRouter;