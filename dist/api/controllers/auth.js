"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const exception_interceptor_middleware_1 = __importDefault(require("../middlewares/exception-interceptor.middleware"));
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const register = async (req, res) => {
    const user = await auth_service_1.default.register(req.body);
    res.status(201).json(user);
};
const login = async (req, res) => {
    const result = await auth_service_1.default.login(req.body);
    res.status(200).json(result);
};
const logout = async (req, res) => {
    const { id } = req.user;
    await prisma_client_1.default.users.update({ where: { id }, data: { token: "" } });
    res.status(200).json({ message: "Logout success" });
};
const current = async (req, res) => {
    const { email, name } = req.user;
    res.status(200).json({ user: { email, name } });
};
exports.default = {
    register: (0, exception_interceptor_middleware_1.default)(register),
    login: (0, exception_interceptor_middleware_1.default)(login),
    logout: (0, exception_interceptor_middleware_1.default)(logout),
    current: (0, exception_interceptor_middleware_1.default)(current)
};
//# sourceMappingURL=auth.js.map