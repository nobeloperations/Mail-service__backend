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
            activityDescription
        }
    });
};
exports.default = {
    emailOpenTracking
};
//# sourceMappingURL=openedEmails.service.js.map