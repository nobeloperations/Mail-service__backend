"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const descriptionCreator_1 = __importDefault(require("../helpers/descriptionCreator"));
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
    await prisma_client_1.default.contactsActions.create({
        data: {
            contactId: id,
            typeOfActivity: "UNSUBSCRIBE",
            activityDescription
        }
    });
};
exports.default = { unsubscribe };
//# sourceMappingURL=unsubscribe.service.js.map