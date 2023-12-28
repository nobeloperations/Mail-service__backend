"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
var DefaultHttpErrorsMessages;
(function (DefaultHttpErrorsMessages) {
    DefaultHttpErrorsMessages["UNAUTHORIZED"] = "Please provide valid credentials";
    DefaultHttpErrorsMessages["NOT_FOUND"] = "The requested resource could not be found";
    DefaultHttpErrorsMessages["INTERNAL_SERVER_ERROR"] = "An unexpected error occurred on the server";
    DefaultHttpErrorsMessages["FORBIDDEN"] = "You do not have permission to access the requested resource";
    DefaultHttpErrorsMessages["BAD_REQUEST"] = "The request could not be processed due to invalid or missing parameters";
    DefaultHttpErrorsMessages["CONFLICT"] = "The request could not be completed due to a conflict with the current state of the resource";
})(DefaultHttpErrorsMessages || (DefaultHttpErrorsMessages = {}));
class HttpError extends Error {
    constructor(name, message, description, httpCode, isOperational) {
        super();
        this.name = name;
        this.message = message;
        this.httpCode = httpCode;
        this.description = description;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
    ;
    static createHttpErrorInstance(name, message, description, httpCode, isOperational) {
        return new HttpError(name, message, description, httpCode, isOperational);
    }
    ;
    static BadRequest(description) {
        return this.createHttpErrorInstance(http_status_codes_1.ReasonPhrases.BAD_REQUEST, DefaultHttpErrorsMessages.BAD_REQUEST, description, http_status_codes_1.StatusCodes.BAD_REQUEST, true);
    }
    ;
    static NotFound(description) {
        return this.createHttpErrorInstance(http_status_codes_1.ReasonPhrases.NOT_FOUND, DefaultHttpErrorsMessages.NOT_FOUND, description, http_status_codes_1.StatusCodes.NOT_FOUND, true);
    }
    ;
    static Unauthorized(description) {
        return this.createHttpErrorInstance(http_status_codes_1.ReasonPhrases.UNAUTHORIZED, DefaultHttpErrorsMessages.UNAUTHORIZED, description, http_status_codes_1.StatusCodes.UNAUTHORIZED, true);
    }
    ;
    static Forbidden() {
        return this.createHttpErrorInstance(http_status_codes_1.ReasonPhrases.FORBIDDEN, DefaultHttpErrorsMessages.FORBIDDEN, undefined, http_status_codes_1.StatusCodes.FORBIDDEN, true);
    }
    ;
    static Conflict(description) {
        return this.createHttpErrorInstance(http_status_codes_1.ReasonPhrases.CONFLICT, DefaultHttpErrorsMessages.CONFLICT, description, http_status_codes_1.StatusCodes.CONFLICT, true);
    }
    ;
    static InternalServerError() {
        return this.createHttpErrorInstance(http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR, DefaultHttpErrorsMessages.INTERNAL_SERVER_ERROR, undefined, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, false);
    }
    ;
}
exports.default = HttpError;
//# sourceMappingURL=index.js.map