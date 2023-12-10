"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const createMails = async (mailsData) => {
    const result = await prisma_client_1.default.scheduledMails.createMany({ data: mailsData });
    return result;
};
const getMailById = async (id) => {
    const result = await prisma_client_1.default.scheduledMails.findUnique({ where: { id } });
    return result;
};
const deleteMailById = async (id) => {
    const result = await prisma_client_1.default.scheduledMails.delete({ where: { id } });
    return result;
};
const updateMailById = async (id, mailData) => {
    const result = await prisma_client_1.default.scheduledMails.update({ where: { id }, data: mailData });
    return result;
};
const getMailsList = async () => {
    const result = await prisma_client_1.default.scheduledMails.findMany();
    return result;
};
const getPendingMailsList = async () => { };
exports.default = {
    createMails,
    getMailById,
    deleteMailById,
    updateMailById,
    getMailsList,
    getPendingMailsList
};
//# sourceMappingURL=scheduled-mails.service.js.map