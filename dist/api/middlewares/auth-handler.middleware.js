"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("../../utils/http-errors"));
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const authenticate = async (req, res, next) => {
    const { SECRET_KEY } = process.env;
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
        return next(http_errors_1.default.Unauthorized('Bearer token is required'));
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const user = await prisma_client_1.default.users.findUnique({ where: { id } });
        if (!user || !user.token || user.token !== token) {
            next(http_errors_1.default.Unauthorized('Invalid or missing authentication token'));
        }
        req.user = user;
        next();
    }
    catch {
        return next(http_errors_1.default.InternalServerError());
    }
};
exports.default = authenticate;
//# sourceMappingURL=auth-handler.middleware.js.map