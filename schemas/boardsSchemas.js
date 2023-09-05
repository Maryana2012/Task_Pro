import Joi from 'joi';

const addBoardSchema = Joi.object({
    title: Joi.string().required(),
    icon: Joi.string().required(),
    background: Joi.string()
})

const addColumnSchema = Joi.object({
    title: Joi.string().required(),
});

const updateColumnSchema = Joi.object({
    title: Joi.string().required(),
});
  
export default {
    addBoardSchema,
    addColumnSchema,
    updateColumnSchema
}