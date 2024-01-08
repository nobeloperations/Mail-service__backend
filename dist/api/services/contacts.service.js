"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const contacts_list_subscription_1 = require("../helpers/contacts-list-subscription");
const createContact = async (contactData) => {
    const isContactExist = await prisma_client_1.default.contact.findUnique({ where: { email: contactData.email } });
    if (!isContactExist) {
        const contact = await prisma_client_1.default.contact.create({ data: contactData });
        await (0, contacts_list_subscription_1.subscribeToRelevantList)(contact);
        return contact;
    }
    else {
        const updatedContact = await updateContactById(isContactExist.id, contactData);
        await (0, contacts_list_subscription_1.subscribeToRelevantList)({ ...updatedContact, eduQuestSelectedDateTime: contactData.eduQuestSelectedDateTime });
        return updatedContact;
    }
};
const deleteContactById = async (id) => {
    const result = await prisma_client_1.default.contact.delete({ where: { id } });
    return result;
};
const updateContactById = async (id, contactData) => {
    const result = await prisma_client_1.default.contact.update({ where: { id }, data: contactData });
    return result;
};
const getContactById = async (id) => {
    const result = await prisma_client_1.default.contact.findUnique({ where: { id } });
    return result;
};
const getContactList = async (filteringParams) => {
    const { search, page, pageSize } = filteringParams;
    const skip = (page - 1) * pageSize;
    const whereCondition = {
        OR: [
            { email: { contains: search } },
            { firstName: { contains: search } },
            { lastName: { contains: search } },
        ],
    };
    const contacts = await prisma_client_1.default.contact.findMany({
        skip,
        take: pageSize,
        where: whereCondition,
    });
    const contactsCount = await prisma_client_1.default.contact.count();
    return {
        contacts,
        contactsCount
    };
};
const batchUpdatingContacts = async (updatingData) => {
    const { contactIds, updates } = updatingData;
    const result = await prisma_client_1.default.contact.updateMany({
        where: {
            id: {
                in: contactIds,
            },
        },
        data: updates,
    });
    return result;
};
const batchDeletingContacts = async (deletingData) => {
    const result = await prisma_client_1.default.contact.deleteMany({
        where: {
            id: {
                in: deletingData.contactIds,
            },
        },
    });
    return result;
};
const getContactActions = async (contactId, typeOfActivity) => {
    const objectQuery = typeOfActivity ? { contactId, typeOfActivity: { equals: typeOfActivity } } : { contactId };
    return await prisma_client_1.default.contactsActions.findMany({
        where: objectQuery
    });
};
exports.default = {
    createContact,
    getContactById,
    getContactList,
    deleteContactById,
    updateContactById,
    batchUpdatingContacts,
    batchDeletingContacts,
    getContactActions
};
//# sourceMappingURL=contacts.service.js.map