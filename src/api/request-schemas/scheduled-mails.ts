import Joi from 'joi';

const createMailSchema = Joi.object({
  contactId: Joi.string().min(23).required(),
  templateId: Joi.string().min(23).required(),
  scheduledDate: Joi.date().required(),
  useContactTimezone: Joi.boolean().required(),
  mailingProfile: Joi.string().valid('WEEKDAY_EQ_MAILING', 'WEEKEND_EQ_MAILING'),
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