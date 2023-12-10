"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_api_errors_1 = __importDefault(require("../../utils/errors/custom-api-errors"));
const errorHandler = (error, req, res, next) => {
    const statusCode = error instanceof custom_api_errors_1.default
        ? error.httpCode
        : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
        name: error.name,
        msg: error instanceof custom_api_errors_1.default
            ? error.message
            : 'Internal server error',
    });
};
exports.default = errorHandler;
//# sourceMappingURL=error-handler.middleware.js.map