import Joi from 'joi';

const AutomationScheduledMailSchemaCreateSchema = Joi.object({
    timeZone: Joi.string().required(),
    useContactTimezone: Joi.boolean().required(),
    scheduledDate: Joi.date().iso().required(),
    templateId: Joi.string().required(),
});

const AutomationScheduledMailSchemaUpdateSchema = Joi.object({
    id: Joi.string(),
    timeZone: Joi.string(),
    useContactTimezone: Joi.boolean(),
    scheduledDate: Joi.date().iso(),
    templateId: Joi.string(),
    mailingAutomationId: Joi.string() 
});
  
const createResourse = Joi.object({
    name: Joi.string().required(),
    automationScheduledMails: Joi.array().items(AutomationScheduledMailSchemaCreateSchema).required()
});

const updateResource = Joi.object({
    name: Joi.string().required(),
    automationScheduledMails: Joi.array().items(AutomationScheduledMailSchemaUpdateSchema).required()
});

const addContactsToResourse = Joi.object({
    contactIds: Joi.array().items(Joi.string()),
});

const removeContactsFromResourse = Joi.object({
    contactIds: Joi.array().items(Joi.string()),
});

export default {
    createResourse,
    updateResource,
    addContactsToResourse,
    removeContactsFromResourse
};

