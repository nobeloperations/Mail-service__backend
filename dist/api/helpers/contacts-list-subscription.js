"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToRelevantList = void 0;
const create_list_name_1 = __importDefault(require("../helpers/create-list-name"));
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const contacts_lists_service_1 = __importDefault(require("../services/contacts-lists.service"));
const subscribeToRelevantList = async (contact) => {
    if (contact.eduQuestSelectedDateTime) {
        const isListExist = await prisma_client_1.default.contactstList.findUnique({ where: { eduQuestStartDate: contact.eduQuestSelectedDateTime } });
        if (isListExist) {
            const { id } = isListExist;
            await updateContactIds(id, contact.id);
        }
        else {
            const name = (0, create_list_name_1.default)(contact.eduQuestSelectedDateTime);
            await contacts_lists_service_1.default.createContactsList({ name, eduQuestStartDate: contact.eduQuestSelectedDateTime, contacts: { connect: [{ id: contact.id }] } });
        }
    }
    else {
        await updateContactIds('Future List', contact.id);
    }
};
exports.subscribeToRelevantList = subscribeToRelevantList;
const updateContactIds = async (identifier, contactId) => {
    const { contactIds, id } = identifier === 'Future List'
        ? await prisma_client_1.default.contactstList.findUnique({ where: { name: identifier } })
        : await prisma_client_1.default.contactstList.findUnique({ where: { id: identifier } });
    if (!contactIds.includes(contactId)) {
        await prisma_client_1.default.contactstList.update({
            where: { id },
            data: { contactIds: [...contactIds, contactId] },
        });
    }
};
//# sourceMappingURL=contacts-list-subscription.js.map