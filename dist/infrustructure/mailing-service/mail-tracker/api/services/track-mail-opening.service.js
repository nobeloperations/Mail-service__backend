"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma_client_1 = __importDefault(require("../../../../../database/prisma-client"));
const trackMailOpening = async (sentMailId) => {
    const targetRecord = await prisma_client_1.default.sentMail.findUnique({
        where: { emailId: sentMailId },
        include: {
            template: true
        }
    });
    if (!targetRecord)
        return;
    const contactActionCreationResult = await prisma_client_1.default.contactsActions.create({
        data: {
            actionType: client_1.ContactActionType.OPEN_MAIL,
            actionDescription: `Contact was opened mail: ${targetRecord.template.name}`,
            contact: {
                connect: {
                    id: targetRecord.contactId
                }
            }
        }
    });
    return contactActionCreationResult;
};
exports.default = {
    trackMailOpening
};
//# sourceMappingURL=track-mail-opening.service.js.map