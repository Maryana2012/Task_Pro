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
    password: Joi.string(),
    photo: Joi.string()
})

const userThemeSchema = Joi.object({
    theme: Joi.string().valid('dark', 'light', 'violet').required()
});

const userLetterSchema = Joi.object({
    email: Joi.string().email().required(),
    text: Joi.string().required()
});
 

export default {
    userRegisterSchema,
    userLoginSchema,
    userThemeSchema,
    userUpdateSchema,
    userLetterSchema
    // userPhotoSchema
}