"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const custom_api_errors_1 = __importDefault(require("../../utils/errors/custom-api-errors"));
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const { SECRET_KEY } = process.env;
const register = async (registerData) => {
    const { email, password } = registerData;
    const user = await prisma_client_1.default.users.findUnique({ where: { email } });
    if (user) {
        throw custom_api_errors_1.default.Conflict("Email already in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma_client_1.default.users.create({
        data: {
            ...registerData,
            password: hashPassword
        }
    });
    return { user: { email: newUser.email, name: newUser.name } };
};
const login = async (loginData) => {
    const { email, password } = loginData;
    const user = await prisma_client_1.default.users.findUnique({ where: { email } });
    if (!user) {
        throw custom_api_errors_1.default.Unauthorized("Email invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw custom_api_errors_1.default.Unauthorized("Password invalid");
    }
    const payload = {
        id: user.id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
    await prisma_client_1.default.users.update({ where: { id: user.id }, data: { token } });
    return { token, user: { email, name: user.name } };
};
exports.default = {
    register,
    login,
};
//# sourceMappingURL=auth.service.js.map