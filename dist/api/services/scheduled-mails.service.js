"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const http_errors_1 = __importDefault(require("../../utils/http-errors"));
const createMails = async (mailsData) => {
    const result = await prisma_client_1.default.scheduledMail.create({ data: mailsData });
    return result;
};
const getMailById = async (id) => {
    const result = await prisma_client_1.default.scheduledMail.findUnique({ where: { id } });
    if (!result) {
        throw http_errors_1.default.NotFound(`The requested resource with id - ${id} could not be found on the server`);
    }
    return result;
};
const deleteMailById = async (id) => {
    const result = await prisma_client_1.default.scheduledMail.delete({ where: { id } });
    return result;
};
const updateMailById = async (id, mailData) => {
    const result = await prisma_client_1.default.scheduledMail.update({ where: { id }, data: mailData });
    return result;
};
const getMailsList = async () => {
    const result = await prisma_client_1.default.scheduledMail.findMany();
    return result;
};
exports.default = {
    createMails,
    getMailById,
    deleteMailById,
    updateMailById,
    getMailsList,
};
//# sourceMappingURL=scheduled-mails.service.js.map