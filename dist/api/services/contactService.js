"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import from "@prisma/client"
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const createContact = async (contactData) => {
    const result = await prisma_client_1.default.contact.createMany({ data: contactData });
    return result;
};
const getContactList = async () => {
    const result = await prisma_client_1.default.contact.findMany();
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
exports.default = {
    createContact,
    getContactList,
    deleteContactById,
    updateContactById,
    getContactById
};
//# sourceMappingURL=contactService.js.map