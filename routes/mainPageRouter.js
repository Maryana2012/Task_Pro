import express from 'express';

import mainPageController from '../controllers/mainPageController.js';
const mainPageRouter = express.Router();

mainPageRouter.get('/', mainPageController);

export default mainPageRouter;