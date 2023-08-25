import Joi from 'joi';

const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
    
export default {
    userRegisterSchema
}