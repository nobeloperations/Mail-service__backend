import Joi from 'joi';

const createResourseSchema = Joi.object({
  name: Joi.string().required(),
  eduQuestStartDate: Joi.date().iso(),
});

const updateResourseSchema = Joi.object({
  name: Joi.string(),
  eduQuestStartDate: Joi.date().iso(),
});

export default {
  createResourseSchema,
  updateResourseSchema
}