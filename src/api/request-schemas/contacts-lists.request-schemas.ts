import Joi from 'joi';

const createResourseSchema = Joi.object({
  name: Joi.string().required(),
  eduQuestStartDate: Joi.date().iso(),
});

const updateResourseSchema = Joi.object({
  name: Joi.string(),
  eduQuestStartDate: Joi.date().iso(),
});

const addRecordContactsToMailingAutomationSchema = Joi.object({
  listId: Joi.string().required(),
  mailingAutomationId: Joi.string().required()
});

const merginListsSchema = Joi.object({
  targetListId: Joi.string().required(),
  listIdToMerge: Joi.string().required()
});

export default {
  merginListsSchema,
  createResourseSchema,
  updateResourseSchema,
  addRecordContactsToMailingAutomationSchema
};