import Joi from 'joi';

const compilerMailingDataSchema = Joi.object({
    subject: Joi.string().required(),
    templateId: Joi.string().required(),
    recipientsData: Joi.array().items(Joi.string()).required(),
    additionalData: Joi.object().required(),
    additionalFlags: Joi.object().optional()
});

export default compilerMailingDataSchema;