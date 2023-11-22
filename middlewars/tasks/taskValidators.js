import taskSchema from '../../schemas/taskSchemas.js';

const taskValidator = (req, res, next) => {
  const { error } = taskSchema.taskSchema.validate(req.body);
  if (error) {
    // Перевірка чи є помилка 'any.required'
    if (error.details[0].type === 'any.required') {
      return res.status(400).json({
        message: `Missing required field: ${error.details[0].context.label}`,
      });
    } else {
      // Інші типи помилок
      return res.status(400).json({ message: error.message });
    }
  }
  next();
};

const moveTask = (req, res, next) => {
  const { error } = taskSchema.moveTaskSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: 'This id is not valid or not found' });
    return;
  }
  next();
};

const isPriority = (req, res, next) => {
  const { error } = taskSchema.priorityTaskSchema.validate(req.body);
  if (error) {
    res
      .status(400)
      .json({ message: 'select priority from [low,medium, high, without]' });
    return;
  }
  next();
};

export default {
  taskValidator,
  moveTask,
  isPriority,
};
