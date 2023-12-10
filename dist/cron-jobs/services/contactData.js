"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const retrieveContactData = async (id) => {
    const contact = await prisma_client_1.default.contact.findUnique({ where: { id } });
    return contact;
};
exports.default = {
    retrieveContactData
};
//# sourceMappingURL=contactData.js.map