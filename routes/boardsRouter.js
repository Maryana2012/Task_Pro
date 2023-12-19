import express from 'express';

import schema from '../schemas/boardsSchemas.js';
import userValidators from '../middlewars/user/userValidators.js';
import {isEmptyBody} from '../middlewars/validatorEmptyBody.js'
import {isValidBoardId, isValidColumnId} from '../middlewars/boards/boards.js'
import { validateBody } from '../middlewars/validatorBody.js';
import boardsController from '../controllers/boardsController.js';

const boardsRouter = express.Router();

boardsRouter.get("/", userValidators.authenticate,  boardsController.getAllBoards);

boardsRouter.post("/", userValidators.authenticate, isEmptyBody, validateBody(schema.addBoardSchema), boardsController.addBoard);

boardsRouter.get('/background', userValidators.authenticate, boardsController.getBackgroundPreviews);

boardsRouter.get("/:boardId", userValidators.authenticate, isValidBoardId, boardsController.getBoard);

boardsRouter.put("/:boardId", userValidators.authenticate, isEmptyBody, validateBody(schema.updateBoardSchema), isValidBoardId, boardsController.updateBoard);

boardsRouter.delete("/:boardId", userValidators.authenticate, isValidBoardId, boardsController.deleteBoard);

boardsRouter.post('/:boardId/columns', userValidators.authenticate, isValidBoardId, validateBody(schema.addColumnSchema), boardsController.addColumn);

boardsRouter.patch('/:boardId/columns/:columnId', userValidators.authenticate, isValidBoardId, isValidColumnId, validateBody(schema.updateColumnSchema), boardsController.updateColumn);
boardsRouter.delete('/:boardId/columns/:columnId', userValidators.authenticate, isValidBoardId, isValidColumnId, boardsController.deleteColumn);

export default boardsRouter;