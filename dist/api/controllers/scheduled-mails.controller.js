"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const exception_interceptor_middleware_1 = __importDefault(require("../middlewares/exception-interceptor.middleware"));
const scheduled_mails_service_1 = __importDefault(require("../services/scheduled-mails.service"));
const createMails = async (req, res) => {
    const mailsData = req.body;
    const createdMail = await scheduled_mails_service_1.default.createMails(mailsData);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(createdMail);
};
const getMailById = async (req, res) => {
    const id = req.params.id;
    const retrievedMailData = await scheduled_mails_service_1.default.getMailById(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(retrievedMailData);
};
const deleteMailById = async (req, res) => {
    const id = req.params.id;
    const deletedMailData = await scheduled_mails_service_1.default.deleteMailById(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedMailData);
};
const updateMailById = async (req, res) => {
    const id = req.params.id;
    const mailData = req.body;
    const updatedMailData = await scheduled_mails_service_1.default.updateMailById(id, mailData);
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedMailData);
};
const getMailsList = async (req, res) => {
    const result = await scheduled_mails_service_1.default.getMailsList();
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
exports.default = {
    createMails: (0, exception_interceptor_middleware_1.default)(createMails),
    getMailById: (0, exception_interceptor_middleware_1.default)(getMailById),
    deleteMailById: (0, exception_interceptor_middleware_1.default)(deleteMailById),
    updateMailById: (0, exception_interceptor_middleware_1.default)(updateMailById),
    getMailsList: (0, exception_interceptor_middleware_1.default)(getMailsList),
};
//# sourceMappingURL=scheduled-mails.controller.js.map