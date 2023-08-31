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

const userUpdateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    photo: Joi.string()
})

const userThemeSchema = Joi.object({
    theme: Joi.string().valid('dark', 'light', 'violet').required()
});

// const userPhotoSchema = Joi.object({
//     photo: Joi.string()
// })   

export default {
    userRegisterSchema,
    userLoginSchema,
    userThemeSchema,
    userUpdateSchema,
    // userPhotoSchema
}