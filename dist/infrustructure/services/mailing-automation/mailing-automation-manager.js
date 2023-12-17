"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../../database/prisma-client"));
const addContactToAutomation = async (contactId, mailingAutomationId) => {
    const targetAutomationDetails = await prisma_client_1.default.mailingAutomation.findUnique({
        where: { id: mailingAutomationId },
        include: { automationScheduledMails: true }
    });
    const automationScheduledMails = targetAutomationDetails.automationScheduledMails;
    for (const scheduledMailData of automationScheduledMails) {
        const scheduledMailCreationResult = await prisma_client_1.default.scheduledMail.create({
            data: {
                contactId,
                ...scheduledMailData,
                mailingAutomationId
            }
        });
    }
};
const stopAutomationForContact = async (contactId, mailingAutomationId) => {
    const contactScheduledMails = await prisma_client_1.default.scheduledMail.deleteMany({
        where: {
            contactId: contactId,
            mailingAutomationId: mailingAutomationId
        }
    });
};
exports.default = {
    addContactToAutomation,
    stopAutomationForContact
};
//# sourceMappingURL=mailing-automation-manager.js.map