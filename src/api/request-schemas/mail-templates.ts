const Joi = require("joi");

const createTemplateSchema = Joi.object({
    name: Joi.string().required(),
    googleDriveFileId: Joi.string().required(),
  });

export default {
    createTemplateSchema,
  }