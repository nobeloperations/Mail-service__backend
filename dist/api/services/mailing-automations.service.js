"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const custom_api_errors_1 = __importDefault(require("../../utils/errors/custom-api-errors"));
const createMailingAutomation = async (mailingAutomationData) => {
    const { automationScheduledMails, ...automationData } = mailingAutomationData;
    const result = await prisma_client_1.default.mailingAutomation.create({
        data: {
            ...automationData,
            automationScheduledMails: {
                create: automationScheduledMails
            }
        }
    });
    return result;
};
const updateMailingAutomationById = async (id, mailingAutomationData) => {
    const result = await prisma_client_1.default.mailingAutomation.update({
        where: { id },
        data: mailingAutomationData
    });
    return result;
};
const deleteMailingAutomationById = async (id) => {
    const result = await prisma_client_1.default.mailingAutomation.delete({
        where: { id }
    });
    return result;
};
const getMailingAutomationById = async (id) => {
    const result = prisma_client_1.default.mailingAutomation.findUnique({
        where: { id },
        include: { automationScheduledMails: true }
    });
    if (!result) {
        throw custom_api_errors_1.default.NotFound(`The requested resource with id - ${id} could not be found on the server`);
    }
    return result;
};
const getMailingAutomationsList = async (filteringParams) => {
    const { search, page, pageSize } = filteringParams;
    const skip = (page - 1) * pageSize;
    const result = await prisma_client_1.default.mailingAutomation.findMany({
        skip,
        take: pageSize,
        where: {
            name: { contains: search }
        },
    });
    return result;
};
const addContactsToAutomation = async (mailingAutomationId, contactIds) => {
    const targetAutomationDetails = await prisma_client_1.default.mailingAutomation.findUnique({
        where: { id: mailingAutomationId },
        include: { automationScheduledMails: true }
    });
    const automationScheduledMails = targetAutomationDetails.automationScheduledMails;
    for (const targetContactId of contactIds) {
        const scheduledMailsForContact = automationScheduledMails.map((scheduledMailData) => {
            return {
                contactId: targetContactId,
                ...scheduledMailData,
                mailingAutomationId
            };
        });
        await prisma_client_1.default.scheduledMail.createMany({ data: scheduledMailsForContact });
    }
};
const removeContactsFromAutomation = async (mailingAutomationId, contactIds) => {
    const removingResult = await prisma_client_1.default.scheduledMail.deleteMany({
        where: {
            contactId: { in: contactIds },
            mailingAutomationId: mailingAutomationId
        }
    });
    return removingResult;
};
exports.default = {
    createMailingAutomation,
    updateMailingAutomationById,
    deleteMailingAutomationById,
    getMailingAutomationById,
    getMailingAutomationsList,
    addContactsToAutomation,
    removeContactsFromAutomation
};
//# sourceMappingURL=mailing-automations.service.js.map