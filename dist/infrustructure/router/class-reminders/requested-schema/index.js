"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const classDataSchema = joi_1.default.object({
    courseCode: joi_1.default.string().required(),
    courseName: joi_1.default.string().required(),
    classIdentifier: joi_1.default.string().required(),
    expoDate: joi_1.default.date().allow(null),
    meetingDates: joi_1.default.array().items(joi_1.default.date()).required(),
    classMeetingLink: joi_1.default.string().required(),
    expoMeetingLink: joi_1.default.string().allow('')
});
const recipientSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    explorerId: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
const classRemindersDataSchema = joi_1.default.object({
    mailingProfileId: joi_1.default.string().required(),
    classData: classDataSchema.required(),
    recipientsData: joi_1.default.array().items(recipientSchema).required()
});
exports.default = classRemindersDataSchema;
//# sourceMappingURL=index.js.map