import Joi from 'joi';

const classDataSchema = Joi.object({
    courseCode: Joi.string().required(),
    courseName: Joi.string().required(),
    classIdentifier: Joi.string().required(),
    expoDate: Joi.date().allow(null),
    meetingDates: Joi.array().items(Joi.date()).required(),
    classMeetingLink: Joi.string().required(),
    expoMeetingLink: Joi.string().allow('')
});

const recipientSchema = Joi.object({
    email: Joi.string().email().required(),
    explorerId: Joi.string().required(),
    password: Joi.string().required()
});

const classRemindersDataSchema = Joi.object({
    mailingProfileId: Joi.string().required(),
    classData: classDataSchema.required(),
    recipientsData: Joi.array().items(recipientSchema).required()
});

export default classRemindersDataSchema;