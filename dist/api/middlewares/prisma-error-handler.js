"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_errors_1 = __importDefault(require("../../utils/http-errors"));
const prismaErrorHandler = (error, req, res, next) => {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                next(http_errors_1.default.Conflict(`Unique constraint failed on the field: ${error.meta.target}`));
                break;
            case 'P2000':
                next(http_errors_1.default.BadRequest(`The provided value for the column is too long for the column's type. Column: ${error.meta.target}`));
                break;
            case 'P2025':
                next(http_errors_1.default.NotFound(`The requested resource could not be found on the server\nCause: ${error.meta.cause}`));
                break;
            case 'P2016':
                next(http_errors_1.default.NotFound(`Record not found in the where clause. Where: ${JSON.stringify(error.meta.where)}`));
                break;
            case 'P2014':
                next(http_errors_1.default.BadRequest(`The change you are trying to make would violate the required relation '${error.meta.relation_name}' between the '${error.meta.model_a_name}' and '${error.meta.model_b_name}' models`));
                break;
            default:
                next(http_errors_1.default.InternalServerError());
        }
    }
    else {
        next(error);
    }
};
exports.default = prismaErrorHandler;
//# sourceMappingURL=prisma-error-handler.js.map