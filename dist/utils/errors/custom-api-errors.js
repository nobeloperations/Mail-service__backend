"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
var DefaultErrorsDescription;
(function (DefaultErrorsDescription) {
    DefaultErrorsDescription["NOT_FOUND"] = "The requested resource could not be found on the server";
    DefaultErrorsDescription["BAD_REQUEST"] = "The server cannot process the request due to a client error, such as malformed syntax or invalid request parameters";
    DefaultErrorsDescription["UNAUTHORIZED"] = "The client lacks proper authentication credentials for the requested resource";
    DefaultErrorsDescription["FORBIDDEN"] = "The client does not have permission to access the requested resource";
    DefaultErrorsDescription["INTERNAL_SERVER_ERROR"] = "The server encountered an unexpected condition that prevented it from fulfilling the request. This is a server-side error, and the issue is not due to the client`s actions";
})(DefaultErrorsDescription || (DefaultErrorsDescription = {}));
class BaseApiError extends Error {
    constructor(name, httpCode, description, isOperational) {
        super(description);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
    static createError(name, statusCode, description, operational) {
        return new BaseApiError(name, statusCode, description, operational);
    }
    static NotFound(description = DefaultErrorsDescription.NOT_FOUND) {
        return this.createError(http_status_codes_1.ReasonPhrases.NOT_FOUND, http_status_codes_1.StatusCodes.NOT_FOUND, description, true);
    }
    static BadRequest(description = DefaultErrorsDescription.BAD_REQUEST) {
        return this.createError(http_status_codes_1.ReasonPhrases.BAD_REQUEST, http_status_codes_1.StatusCodes.BAD_REQUEST, description, true);
    }
    static Unauthorized(description = DefaultErrorsDescription.UNAUTHORIZED) {
        return this.createError(http_status_codes_1.ReasonPhrases.UNAUTHORIZED, http_status_codes_1.StatusCodes.UNAUTHORIZED, description, true);
    }
    static Forbidden(description = DefaultErrorsDescription.FORBIDDEN) {
        return this.createError(http_status_codes_1.ReasonPhrases.FORBIDDEN, http_status_codes_1.StatusCodes.FORBIDDEN, description, true);
    }
    static InternalServerError(description = DefaultErrorsDescription.INTERNAL_SERVER_ERROR) {
        return this.createError(http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, description, false);
    }
}
exports.default = BaseApiError;
//# sourceMappingURL=custom-api-errors.js.map