"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const createMailSchema = Joi.object({
    contactId: Joi.string().min(23).required(),
    templateId: Joi.string().min(23).required(),
    timeZone: Joi.string().required(),
    scheduledDate: Joi.date().required(),
    useContactTimezone: Joi.boolean().required(),
    senderProfileId: Joi.string().min(23).required(),
});
const updateMailSchema = Joi.object({
    contactId: Joi.string().min(23),
    templateId: Joi.string().min(23),
    timeZone: Joi.string(),
    scheduledDate: Joi.date(),
    useContactTimezone: Joi.boolean(),
    senderProfileId: Joi.string().min(23),
});
exports.default = {
    createMailSchema,
    updateMailSchema
};
//# sourceMappingURL=scheduled-mails.js.map