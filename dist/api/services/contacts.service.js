"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const createContact = async (contactData) => {
    const result = await prisma_client_1.default.contact.create({ data: contactData });
    return result;
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
    const result = await prisma_client_1.default.contact.findMany({
        skip,
        take: pageSize,
        where: {
            OR: [
                { email: { contains: search } },
                { firstName: { contains: search } },
                { lastName: { contains: search } },
            ],
        },
    });
    return result;
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
exports.default = {
    createContact,
    getContactById,
    getContactList,
    deleteContactById,
    updateContactById,
    batchUpdatingContacts,
    batchDeletingContacts,
};
//# sourceMappingURL=contacts.service.js.map