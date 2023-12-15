"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
    }
}
const createHttpError = (status, message) => {
    return new HttpError(status, message);
};
exports.default = createHttpError;
//# sourceMappingURL=HttpError.js.map