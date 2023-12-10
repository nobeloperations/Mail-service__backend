"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const retrievePendingMails = async () => {
    const currentDateTime = new Date();
    const mails = await prisma_client_1.default.scheduledMail.findMany({
        where: {
            scheduledDate: {
                lte: currentDateTime
            }
        }
    });
    return mails;
};
const deletePendingMail = async (id) => {
    const mail = await prisma_client_1.default.scheduledMail.delete({
        where: {
            id,
        },
    });
    return mail;
};
exports.default = {
    retrievePendingMails,
    deletePendingMail
};
//# sourceMappingURL=scheduled-mails.service.js.map