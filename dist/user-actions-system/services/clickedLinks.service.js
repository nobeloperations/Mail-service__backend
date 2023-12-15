"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const descriptionCreator_1 = __importDefault(require("../helpers/descriptionCreator"));
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
            activityDescription
        }
    });
};
exports.default = {
    emailLinkTracking
};
//# sourceMappingURL=clickedLinks.service.js.map