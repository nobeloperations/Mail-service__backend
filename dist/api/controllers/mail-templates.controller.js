"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const exception_interceptor_middleware_1 = __importDefault(require("../middlewares/exception-interceptor.middleware"));
const mail_templates_service_1 = __importDefault(require("../services/mail-templates.service"));
const getMailTemplateDataById = async (req, res) => {
    const id = req.params.id;
    const templateData = await mail_templates_service_1.default.getMailTemplateDataById(id);
    res.status(http_status_codes_1.StatusCodes.OK).send(templateData);
};
const getMailTemplatesList = async (req, res) => {
    const { page, pageSize } = req.query;
    const result = await mail_templates_service_1.default.getMailTemplatesList({
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
const deleteMailTemplateById = async (req, res) => {
    const id = req.params.id;
    const result = await mail_templates_service_1.default.deleteMailTemplateById(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(result);
};
const createMailTemplates = async (req, res) => {
    if (!req.files) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
    }
    await mail_templates_service_1.default.createMailTemplates(req.files);
    res.status(http_status_codes_1.StatusCodes.CREATED).send(http_status_codes_1.ReasonPhrases.CREATED);
};
exports.default = {
    createMailTemplates: (0, exception_interceptor_middleware_1.default)(createMailTemplates),
    getMailTemplatesList: (0, exception_interceptor_middleware_1.default)(getMailTemplatesList),
    deleteMailTemplateById: (0, exception_interceptor_middleware_1.default)(deleteMailTemplateById),
    getMailTemplateDataById: (0, exception_interceptor_middleware_1.default)(getMailTemplateDataById),
};
//# sourceMappingURL=mail-templates.controller.js.map