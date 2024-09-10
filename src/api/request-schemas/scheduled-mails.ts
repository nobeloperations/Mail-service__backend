import Joi from 'joi';

const createMailSchema = Joi.object({
  contactId: Joi.string().min(23).required(),
  templateId: Joi.string().min(23).required(),
  scheduledDate: Joi.date().required(),
  useContactTimezone: Joi.boolean().required(),
  mailingProfileId: Joi.string().required(),
  subject: Joi.string().required()
});

const updateMailSchema = Joi.object({
  contactId: Joi.string().min(23),
  templateId: Joi.string().min(23),
  scheduledDate: Joi.date(),
  useContactTimezone: Joi.boolean(),
});



export default {
  createMailSchema,
  updateMailSchema
};