"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../../../../database/prisma-client"));
const unsubscribeContactFromMailing = async (sentMailId) => {
    const targetRecord = await prisma_client_1.default.sentMail.findUnique({ where: { emailId: sentMailId } });
    if (!targetRecord || targetRecord.contactId === '6650ec1e4bc3df3c69d68293')
        return;
    const unsubscribingResult = await prisma_client_1.default.contact.update({
        where: { id: targetRecord.contactId },
        data: {
            isSubscribed: false,
        }
    });
    return unsubscribingResult;
};
exports.default = {
    unsubscribeContactFromMailing
};
//# sourceMappingURL=mailing-unsubscriber.service.js.map