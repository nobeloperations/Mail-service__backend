"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createMailSchema = joi_1.default.object({
    contactId: joi_1.default.string().min(23).required(),
    templateId: joi_1.default.string().min(23).required(),
    scheduledDate: joi_1.default.date().required(),
    useContactTimezone: joi_1.default.boolean().required(),
});
const updateMailSchema = joi_1.default.object({
    contactId: joi_1.default.string().min(23),
    templateId: joi_1.default.string().min(23),
    scheduledDate: joi_1.default.date(),
    useContactTimezone: joi_1.default.boolean(),
});
exports.default = {
    createMailSchema,
    updateMailSchema
};
//# sourceMappingURL=scheduled-mails.js.map