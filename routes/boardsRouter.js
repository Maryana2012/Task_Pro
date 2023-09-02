import express from 'express';

import userValidators from '../middlewars/user/userValidators.js'
import boardsController from '../controllers/boardsController.js';
import boardsSchemas from '../schemas/boardsSchemas.js';
import validateBody from '../decorators/validateBody.js';
import getBackgroundPreviews from '../controllers/backgroundController.js';

const boardsRouter = express.Router();

boardsRouter.get("/", 
// userValidators.authenticate, 
boardsController.getAllBoards);

boardsRouter.post("/", 
// userValidators.authenticate, 
validateBody(boardsSchemas.addBoardSchema), boardsController.addBoard);

boardsRouter.get("/:boardId", 
// userValidators.authenticate, 
boardsController.getBoard);

boardsRouter.put("/:boardId", 
// userValidators.authenticate, 
boardsController.updateBoard);

boardsRouter.delete("/:boardId", 
// userValidators.authenticate, 
boardsController.deleteBoard);

boardsRouter.post('/:boardId/columns', 
// userValidators.authenticate, 
validateBody(boardsSchemas.addColumnSchema), boardsController.addColumn);

boardsRouter.patch('/:boardId/columns/:columnId', 
// userValidators.authenticate, 
validateBody(boardsSchemas.updateColumnSchema), boardsController.updateColumn);

boardsRouter.delete('/:boardId/columns/:columnId', 
// userValidators.authenticate, 
boardsController.deleteColumn);

boardsRouter.get('/:boardId/background', 
// userValidators.authenticate, 
getBackgroundPreviews);

export default boardsRouter;