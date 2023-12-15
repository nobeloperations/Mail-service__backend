"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const custom_api_errors_1 = __importDefault(require("../../utils/errors/custom-api-errors"));
const { SECRET_KEY } = process.env;
const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(custom_api_errors_1.default.Unauthorized("Not authorized"));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await prisma_client_1.default.users.findUnique({ where: { id } });
        if (!user || !user.token || user.token !== token) {
            next(custom_api_errors_1.default.Unauthorized("Not authorized"));
        }
        req.user = user;
        next();
    }
    catch {
        next(custom_api_errors_1.default.Unauthorized("Not authorized"));
    }
};
exports.default = authenticate;
//# sourceMappingURL=authenticate.js.map