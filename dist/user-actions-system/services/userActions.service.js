"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const userActions = async (contactId, typeOfActivity) => {
    const objectQuery = typeOfActivity ? { contactId, typeOfActivity: { equals: typeOfActivity } } : { contactId };
    return await prisma_client_1.default.contactsActions.findMany({
        where: objectQuery
    });
};
exports.default = { userActions };
//# sourceMappingURL=userActions.service.js.map