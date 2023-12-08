import Joi from 'joi';

const addBoardSchema = Joi.object({
    title: Joi.string().trim().min(1).required(),
    icon: Joi.string().required(),
    background: Joi.string()
})
const updateBoardSchema = Joi.object({
    title: Joi.string().trim().min(1).required(),
    icon: Joi.string().required(),
    background: Joi.string()
})

const addColumnSchema = Joi.object({
    title: Joi.string().trim().min(1).required(),
});

const updateColumnSchema = Joi.object({
    title: Joi.string().trim().min(1).required(),
});
  
export default {
    addBoardSchema,
    addColumnSchema,
    updateBoardSchema,
    updateColumnSchema
}