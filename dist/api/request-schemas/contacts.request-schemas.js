"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createResourse = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    age: joi_1.default.number().required(),
    city: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    gender: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    timezone: joi_1.default.string().required(),
    occupation: joi_1.default.string().required(),
    sourceOfReferral: joi_1.default.string().required(),
    intershipMotivation: joi_1.default.string().required(),
    birthDate: joi_1.default.date().iso().required(),
    eduQuestSelectedDateTime: joi_1.default.date(),
});
const updateResource = joi_1.default.object({
    firstName: joi_1.default.string(),
    lastName: joi_1.default.string(),
    age: joi_1.default.number(),
    city: joi_1.default.string(),
    email: joi_1.default.string().email(),
    gender: joi_1.default.string(),
    country: joi_1.default.string(),
    timezone: joi_1.default.string(),
    occupation: joi_1.default.string(),
    sourceOfReferral: joi_1.default.string(),
    eduQuestDecision: joi_1.default.string(),
    intershipMotivation: joi_1.default.string(),
    birthDate: joi_1.default.date().iso(),
    eduQuestSelectedDateTime: joi_1.default.date().iso(),
});
const createResourseFormSubmitionForm = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    age: joi_1.default.number().required(),
    email: joi_1.default.string().required().email(),
    gender: joi_1.default.string().required(),
    country: joi_1.default.string(),
    occupation: joi_1.default.string().required(),
    sourceOfReferral: joi_1.default.string().required(),
    intershipMotivation: joi_1.default.string().required(),
    birthDate: joi_1.default.date().iso().required(),
    eduQuestSelectedDateTime: joi_1.default.date(),
});
const bulkUpdatingResouces = joi_1.default.object({
    contactIds: joi_1.default.array().items(joi_1.default.string()).required(),
    updates: updateResource
});
const bulkDeletingResouces = joi_1.default.object({
    contactIds: joi_1.default.array().items(joi_1.default.string()).required(),
});
exports.default = {
    createResourse,
    updateResource,
    bulkUpdatingResouces,
    bulkDeletingResouces,
    createResourseFormSubmitionForm
};
//# sourceMappingURL=contacts.request-schemas.js.map