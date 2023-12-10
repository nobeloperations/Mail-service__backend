"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const addSendedMail = async (mailData) => {
    const sendedmMail = await prisma_client_1.default.sentMail.create({
        data: {
            ...mailData
        }
    });
    return sendedmMail;
};
exports.default = {
    addSendedMail
};
//# sourceMappingURL=sended-mails.js.map