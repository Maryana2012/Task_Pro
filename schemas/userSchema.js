import Joi from 'joi';

const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    theme: Joi.string(),
    photo: Joi.string()
})

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


// const userThemeSchema = Joi.object({
//     theme: Joi.string().valid('dark', 'light', 'violet').required()
// })
    
export default {
    userRegisterSchema,
    userLoginSchema,
    // userThemeSchema,
}