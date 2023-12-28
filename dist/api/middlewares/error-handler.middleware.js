"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("../../utils/http-errors"));
const errorHandler = (error, req, res, next) => {
    let errorResponse;
    if (error instanceof http_errors_1.default) {
        errorResponse = {
            code: error.httpCode,
            name: error.name,
            message: error.message,
            description: error.description,
        };
    }
    else {
        const internalServerError = http_errors_1.default.InternalServerError();
        errorResponse = {
            code: internalServerError.httpCode,
            name: internalServerError.name,
            message: internalServerError.message,
        };
    }
    return res.json({ error: errorResponse });
};
exports.default = errorHandler;
//# sourceMappingURL=error-handler.middleware.js.map