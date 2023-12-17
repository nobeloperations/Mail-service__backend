const Joi = require("joi");

const createContactsListSchema = Joi.object({
    name: Joi.string().required(),
    contactIds: Joi.array().items(Joi.string()).required(),
  });

  const updateContactsListSchema = Joi.object({
    name: Joi.string(),
    contactIds: Joi.array().items(Joi.string()),
  });

export default {
    createContactsListSchema,
    updateContactsListSchema
  }