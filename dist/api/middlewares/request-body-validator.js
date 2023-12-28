"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("../../utils/http-errors"));
const requestBodyValidator = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return next(http_errors_1.default.BadRequest(`Invalid request body structure: ${error.details.map(detail => detail.message).join(', ')}`));
    }
    next();
};
exports.default = requestBodyValidator;
//# sourceMappingURL=request-body-validator.js.map