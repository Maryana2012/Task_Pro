import express from 'express';

import userValidators from '../middlewars/user/userValidators.js'
import boardsController from '../controllers/boardsController.js';
import boardsSchemas from '../schemas/boardsSchemas.js';
import validateBody from '../decorators/validateBody.js';

const boardsRouter = express.Router();

boardsRouter.get("/", userValidators.authenticate, boardsController.getAllBoards);

boardsRouter.post("/", userValidators.authenticate, validateBody(boardsSchemas.addBoardSchema), boardsController.addBoard);

boardsRouter.get("/:boardId", 
userValidators.authenticate, 
// userValidators.isValidId, 
boardsController.getBoard);

boardsRouter.put("/:boardId", 
userValidators.authenticate,
 userValidators.isEmptyBody, 
//  userValidators.isValidId, 
 boardsController.updateBoard);

boardsRouter.delete("/:boardId", 
userValidators.authenticate, 
userValidators.isValidId, 
boardsController.deleteBoard);

boardsRouter.post('/:boardId/columns', userValidators.authenticate, userValidators.isEmptyBody, userValidators.isValidId, validateBody(boardsSchemas.addColumnSchema), boardsController.addColumn);

boardsRouter.patch('/:boardId/columns/:columnId', userValidators.authenticate, userValidators.isEmptyBody, userValidators.isValidId, validateBody(boardsSchemas.updateColumnSchema), boardsController.updateColumn);

boardsRouter.delete('/:boardId/columns/:columnId', userValidators.authenticate, userValidators.isValidId, boardsController.deleteColumn);

boardsRouter.get('/:boardId/background', userValidators.authenticate, userValidators.isValidId, boardsController.getBackgroundPreviews);

export default boardsRouter;