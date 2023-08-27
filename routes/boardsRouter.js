import express from 'express';

// import userControllers from '../controllers/userControllers.js';
// import userValidators from '../middlewars/user/userValidators.js'
import userControllers from '../controllers/userControllers.js';

const boardsRouter = express.Router();

userRouter.get('/', boardsController.getAllBoards);

userRouter.get('/:boardId', boardsController.getBoard);

userRouter.post('/', boardsController.addBoard);

userRouter.put('/:boardId', boardsController.updateBoard);

userRouter.delete('/:boardId', boardsController.deleteBoard);

userRouter.post('/:boardId/columns', boardsController.addColumnInBoard);

userRouter.patch('/:boardId/columns/:columnId', boardsController.updateColumnInBoard);

userRouter.delete('/:boardId/columns/:columnId', boardsController.deleteColumnInBoard);

export default boardsRouter;