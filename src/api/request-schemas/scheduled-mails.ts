import Joi from 'joi';

const createMailSchema = Joi.object({
  contactId: Joi.string().min(23).required(),
  templateId: Joi.string().min(23).required(),
  timeZone: Joi.string().required(),
  scheduledDate: Joi.date().iso().required(),
  useContactTimezone: Joi.boolean().required(),
});

const updateMailSchema = Joi.object({
  contactId: Joi.string().min(23),
  templateId: Joi.string().min(23),
  timeZone: Joi.string(),
  scheduledDate: Joi.date(),
  useContactTimezone: Joi.boolean(),
});

export default {
  createMailSchema,
  updateMailSchema
};