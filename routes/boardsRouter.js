import express from 'express';

import boardsController from '../controllers/boardsController.js';
import boardsSchemas from '../schemas/boardsSchemas.js';
import validateBody from '../decorators/validateBody.js';
import userValidators from '../middlewars/user/userValidators.js';
import {isValidBoardId, isValidColumnId} from '../middlewars/boards/boards.js'


const boardsRouter = express.Router();

boardsRouter.get("/", userValidators.authenticate,  boardsController.getAllBoards);
boardsRouter.post("/", userValidators.authenticate, validateBody(boardsSchemas.addBoardSchema), boardsController.addBoard);
boardsRouter.get('/background', userValidators.authenticate, boardsController.getBackgroundPreviews);
boardsRouter.get("/:boardId", userValidators.authenticate, isValidBoardId, boardsController.getBoard);
boardsRouter.put("/:boardId", userValidators.authenticate, isValidBoardId, boardsController.updateBoard);
boardsRouter.delete("/:boardId", userValidators.authenticate, isValidBoardId, boardsController.deleteBoard);
boardsRouter.post('/:boardId/columns', userValidators.authenticate, isValidBoardId, validateBody(boardsSchemas.addColumnSchema), boardsController.addColumn);
boardsRouter.patch('/:boardId/columns/:columnId', userValidators.authenticate, isValidBoardId, isValidColumnId, validateBody(boardsSchemas.updateColumnSchema), boardsController.updateColumn);
boardsRouter.delete('/:boardId/columns/:columnId', userValidators.authenticate, isValidBoardId, isValidColumnId, boardsController.deleteColumn);

export default boardsRouter;