"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const descriptionCreator_1 = __importDefault(require("../helpers/descriptionCreator"));
const emailOpenTracking = async (emailId) => {
    const { contactId, templateId } = await prisma_client_1.default.sentMail.update({
        where: {
            emailId
        },
        data: {
            emailStatus: "OPENED"
        }
    });
    const activityDescription = await descriptionCreator_1.default.generateDescriptionForEmailsActions(templateId);
    await prisma_client_1.default.contactsActions.create({
        data: {
            contactId,
            typeOfActivity: "EMAIL",
            templateId,
            activityDescription
        }
    });
};
const emailLinkTracking = async (emailId, linkName) => {
    const { templateId, contactId } = await prisma_client_1.default.sentMail.findUnique({
        where: {
            emailId
        }
    });
    const activityDescription = await descriptionCreator_1.default.generateDescriptionForLinksActions(templateId, linkName);
    await prisma_client_1.default.contactsActions.create({
        data: {
            contactId,
            typeOfActivity: "LINK",
            templateId,
            activityDescription
        }
    });
};
const unsubscribe = async (id) => {
    const { email } = await prisma_client_1.default.contact.update({
        where: {
            id
        },
        data: {
            isSubscribed: false
        }
    });
    const activityDescription = descriptionCreator_1.default.generateDescriptionForUnsubscribeAction(email);
    await prisma_client_1.default.unsubscribedUsers.create({
        data: {
            contactId: id,
            activityDescription
        }
    });
};
const unsubscribedContactsList = async () => {
    return await prisma_client_1.default.unsubscribedUsers.findMany({});
};
const unsubscribedContact = async (id) => {
    return await prisma_client_1.default.unsubscribedUsers.findUnique({
        where: {
            id
        }
    });
};
const contactActions = async (contactId, typeOfActivity) => {
    const objectQuery = typeOfActivity ? { contactId, typeOfActivity: { equals: typeOfActivity } } : { contactId };
    return await prisma_client_1.default.contactsActions.findMany({
        where: objectQuery
    });
};
exports.default = {
    emailLinkTracking,
    emailOpenTracking,
    contactActions,
    unsubscribe,
    unsubscribedContact,
    unsubscribedContactsList
};
//# sourceMappingURL=contact-actions.service.js.map