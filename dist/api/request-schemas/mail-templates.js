"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const createTemplateSchema = Joi.object({
    name: Joi.string().required(),
    googleDriveFileId: Joi.string().required(),
});
exports.default = {
    createTemplateSchema,
};
//# sourceMappingURL=mail-templates.js.map