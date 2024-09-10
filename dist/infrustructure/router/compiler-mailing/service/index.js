"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../../../database/prisma-client"));
;
;
const setCompilerMailing = async (data) => {
    const { extendedRecipientData, notFoundRecipients } = await getExtendedRecipientData(data.recipientsData);
    if (extendedRecipientData.length <= 0) {
        return notFoundRecipients;
    }
    const scheduledMails = extendedRecipientData.map(recipientData => {
        const mailObject = {
            subject: data.subject,
            scheduledDate: new Date(),
            useContactTimezone: false,
            contactId: recipientData.id,
            templateId: data.templateId,
            mailingProfileId: '661f9c1f902d20dd197380e9',
            additionalData: JSON.parse(JSON.stringify(data.additionalData)),
        };
        if (data.additionalFlags && Object.keys(data.additionalFlags).length > 0) {
            mailObject['additionalFlags'] = JSON.parse(JSON.stringify(data.additionalFlags));
        }
        return mailObject;
    });
    await prisma_client_1.default.scheduledMail.createMany({ data: scheduledMails });
    return notFoundRecipients;
};
const getExtendedRecipientData = async (recipeintEmails) => {
    const databaseResult = await prisma_client_1.default.contact.findMany({
        where: {
            email: {
                in: recipeintEmails
            }
        },
        select: {
            id: true,
            email: true,
            timezone: true
        }
    });
    const notFoundRecipients = recipeintEmails.filter(email => {
        return !databaseResult.some(obj => obj.email === email);
    });
    return {
        notFoundRecipients,
        extendedRecipientData: databaseResult
    };
};
exports.default = {
    setCompilerMailing
};
//# sourceMappingURL=index.js.map