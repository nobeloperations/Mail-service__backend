"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_api_errors_1 = __importDefault(require("../../utils/errors/custom-api-errors"));
const validateBody = (schema) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(custom_api_errors_1.default.BadRequest(error.message));
        }
        next();
    };
    return func;
};
exports.default = validateBody;
//# sourceMappingURL=validateBody.js.map