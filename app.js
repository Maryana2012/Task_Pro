import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import mainPageRouter from './routes/mainPageRouter.js';
import userRouter from './routes/userRouters.js';
import taskRouter from './routes/taskRouter.js'
import boardsRouter from './routes/boardsRouter.js'

// для swagger
import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json" assert { type: "json" };
import swaggerDocument from "./swagger.json";
// import paths from "./paths.json" assert { type: "json" };
import paths from "./paths.json";
// import components from "./components.json" assert { type: "json" };;
import components from "./components.json";


const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

swaggerDocument.paths = paths;
swaggerDocument.components = components;

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/', mainPageRouter);
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/boards', boardsRouter);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message })
})


export default app;
