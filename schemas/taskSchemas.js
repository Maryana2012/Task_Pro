import Joi from "joi";

const taskSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  deadline: Joi.string().required(),
  priority: Joi.string().valid('low', 'medium', 'high', 'without')
});

const moveTaskSchema = Joi.object({
  newColumnId: Joi.string().required()
});

// const priorityTaskSchema = Joi.object({
//   boardId: Joi.string().required(), 
//   priority: Joi.string().valid('low', 'medium', 'high', 'without').required()
// });

export default  {
  taskSchema,
  moveTaskSchema,
  // priorityTaskSchema
}