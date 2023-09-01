import Joi from 'joi';

const choiceBackgroundSchema = Joi.object({
    _id: Joi.string().required(),
    previewURL: Joi.string().required(),
})

  
export default {
    choiceBackgroundSchema
}