"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const compilerMailingDataSchema = joi_1.default.object({
    subject: joi_1.default.string().required(),
    templateId: joi_1.default.string().required(),
    recipientsData: joi_1.default.array().items(joi_1.default.string()).required(),
    additionalData: joi_1.default.object().required(),
    additionalFlags: joi_1.default.object().optional()
});
exports.default = compilerMailingDataSchema;
//# sourceMappingURL=index.js.map