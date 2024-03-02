"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../../../database/prisma-client"));
const createRecord = async (data) => {
    const sentedmMail = await prisma_client_1.default.sentMail.create({ data });
    return sentedmMail;
};
exports.default = {
    createRecord
};
//# sourceMappingURL=sent-mail.service.js.map