"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const AutomationScheduledMailSchemaCreateSchema = joi_1.default.object({
    timeZone: joi_1.default.string().required(),
    useContactTimezone: joi_1.default.boolean().required(),
    scheduledDate: joi_1.default.date().iso().required(),
    templateId: joi_1.default.string().required(),
});
const AutomationScheduledMailSchemaUpdateSchema = joi_1.default.object({
    id: joi_1.default.string(),
    timeZone: joi_1.default.string(),
    useContactTimezone: joi_1.default.boolean(),
    scheduledDate: joi_1.default.date().iso(),
    templateId: joi_1.default.string(),
    mailingAutomationId: joi_1.default.string()
});
const createResourse = joi_1.default.object({
    name: joi_1.default.string().required(),
    automationScheduledMails: joi_1.default.array().items(AutomationScheduledMailSchemaCreateSchema).required()
});
const updateResource = joi_1.default.object({
    name: joi_1.default.string().required(),
    automationScheduledMails: joi_1.default.array().items(AutomationScheduledMailSchemaUpdateSchema).required()
});
const addContactsToResourse = joi_1.default.object({
    contactIds: joi_1.default.array().items(joi_1.default.string()),
});
const removeContactsFromResourse = joi_1.default.object({
    contactIds: joi_1.default.array().items(joi_1.default.string()),
});
exports.default = {
    createResourse,
    updateResource,
    addContactsToResourse,
    removeContactsFromResourse
};
//# sourceMappingURL=mailing-automations.requst-schemas.js.map