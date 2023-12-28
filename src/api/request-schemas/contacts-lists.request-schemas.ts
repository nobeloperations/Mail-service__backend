import Joi from 'joi';

const createResourseSchema = Joi.object({
  name: Joi.string().required(),
  eduQuestStartDate: Joi.date(),
});

const updateResourseSchema = Joi.object({
  name: Joi.string(),
  eduQuestStartDate: Joi.date(),
});

export default {
  createResourseSchema,
  updateResourseSchema
}