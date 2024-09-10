"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExceptionInterceptor = (controller) => {
    const func = async (req, res, next) => {
        try {
            await controller(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
    return func;
};
exports.default = ExceptionInterceptor;
//# sourceMappingURL=exception-interceptor.middleware.js.map