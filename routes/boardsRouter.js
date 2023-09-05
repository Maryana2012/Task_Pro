import express from 'express';

import userValidators from '../middlewars/user/userValidators.js'
import boardsController from '../controllers/boardsController.js';
import boardsSchemas from '../schemas/boardsSchemas.js';
import validateBody from '../decorators/validateBody.js';

const boardsRouter = express.Router();

boardsRouter.get("/", userValidators.authenticate,  boardsController.getAllBoards);
boardsRouter.post("/", userValidators.authenticate, validateBody(boardsSchemas.addBoardSchema), boardsController.addBoard);
boardsRouter.get('/background', userValidators.authenticate, boardsController.getBackgroundPreviews);
boardsRouter.get("/:boardId", userValidators.authenticate, boardsController.getBoard);
boardsRouter.put("/:boardId", userValidators.authenticate, boardsController.updateBoard);
boardsRouter.delete("/:boardId", userValidators.authenticate, boardsController.deleteBoard);
boardsRouter.post('/:boardId/columns', userValidators.authenticate, validateBody(boardsSchemas.addColumnSchema), boardsController.addColumn);
boardsRouter.patch('/:boardId/columns/:columnId', userValidators.authenticate, validateBody(boardsSchemas.updateColumnSchema), boardsController.updateColumn);
boardsRouter.delete('/:boardId/columns/:columnId', userValidators.authenticate, boardsController.deleteColumn);

export default boardsRouter;