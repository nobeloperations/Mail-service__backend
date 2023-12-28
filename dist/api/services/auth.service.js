"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const http_errors_1 = __importDefault(require("../../utils/http-errors"));
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const { SECRET_KEY } = process.env;
const register = async (registerData) => {
    const { email, password } = registerData;
    const user = await prisma_client_1.default.users.findUnique({ where: { email } });
    if (user) {
        throw http_errors_1.default.Conflict("Email already in use");
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
        throw http_errors_1.default.Unauthorized('asd');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw http_errors_1.default.Unauthorized('asdf');
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