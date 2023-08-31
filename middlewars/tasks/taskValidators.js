import taskSchema from "../../schemas/taskSchemas.js" 

const taskValidator = (req, res, next) => {
    const { error } = taskSchema.taskSchema.validate(req.body);
    if (error && error.details[0].type === "any.required") {
        res.status(400).json({ message: `missing required ${error.details[0].path[0]} field` });
        return;
    } else if (error.details[0].type.includes('base')) {
        res.status(400).json(message.error);
        return;
    }
    next();
}

const moveTask = (req, res, next) => {
    const { error } = taskSchema.moveTaskSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: "This id is not valid or not found" });
        return;
    }
    next();
}

const isPriority = (req, res, next) => {
    const { error } = taskSchema.priorityTaskSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: 'select priority from [low,medium, high, without]' });
        return;
    }
    next();
}



export default {
    taskValidator,
    moveTask,
    isPriority
}