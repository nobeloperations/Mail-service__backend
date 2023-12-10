"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const custom_api_errors_1 = __importDefault(require("../../utils/errors/custom-api-errors"));
const prismaErrorHandler = (error, req, res, next) => {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            next(custom_api_errors_1.default.NotFound(`The requested resource could not be found on the server\nCause: ${error.meta.cause}`));
        }
    }
    next(error);
};
exports.default = prismaErrorHandler;
//# sourceMappingURL=prisma-error-handler.js.map