"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const contactService_1 = __importDefault(require("../services/contactService"));
const createContact = async (req, res) => {
    const contactData = req.body;
    const createdContact = await contactService_1.default.createContact(contactData);
    res.status(http_status_codes_1.StatusCodes.CREATED).send(http_status_codes_1.ReasonPhrases.CREATED);
};
const getContactById = async (req, res) => {
    const id = req.params.id;
    const retrivedContactData = await contactService_1.default.getContactById(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(retrivedContactData);
};
const deleteContactById = async (req, res) => {
    const id = req.params.id;
    const deletedContact = await contactService_1.default.deleteContactById(id);
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(deletedContact);
};
const updateContactById = async (req, res) => {
    const id = req.params.id;
    const contactData = req.body;
    const updatedContactData = await contactService_1.default.updateContactById(id, contactData);
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedContactData);
};
const getContactList = async (req, res) => {
    const result = await contactService_1.default.getContactList();
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
exports.default = {
    createContact,
    getContactById,
    deleteContactById,
    updateContactById,
    getContactList,
};
//# sourceMappingURL=contactController.js.map