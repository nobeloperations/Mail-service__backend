"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExceptionInterceptor = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = ExceptionInterceptor;
//# sourceMappingURL=exception-interceptor.middleware.js.map