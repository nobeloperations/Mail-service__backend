"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const custom_api_errors_1 = __importDefault(require("../../utils/errors/custom-api-errors"));
const mail_templates_driver_service_1 = __importDefault(require("../../infrustructure/services/google-services/mail-templates.driver-service"));
const getMailTemplateDataById = async (id) => {
    const databaseResult = await prisma_client_1.default.mailTemplate.findUnique({ where: { id } });
    if (!databaseResult) {
        throw custom_api_errors_1.default.NotFound(`The requested resource with id - ${id} could not be found on the server`);
    }
    const templateFileData = await mail_templates_driver_service_1.default.getMailTemplateFileDataById(databaseResult.googleDriveFileId);
    return templateFileData;
};
const createMailTemplates = async (files) => {
    for (const fileName in files) {
        const targetUploadedMailTemplateFile = files[fileName];
        const googleDriveCreationResult = await mail_templates_driver_service_1.default.createNewMailTemplateFile(fileName, targetUploadedMailTemplateFile);
        const databaseCreationResult = await prisma_client_1.default.mailTemplate.create({
            data: {
                name: fileName,
                googleDriveFileId: googleDriveCreationResult.data.id,
            }
        });
    }
};
const deleteMailTemplateById = async (id) => {
    const databaseSearchingResult = await prisma_client_1.default.mailTemplate.findUnique({ where: { id } });
    if (!databaseSearchingResult) {
        throw custom_api_errors_1.default.NotFound(`The requested resource with id - ${id} could not be found on the server`);
    }
    const deleteFromGoogleDriveResult = await mail_templates_driver_service_1.default.deleteMailTemplateFileById(databaseSearchingResult.googleDriveFileId);
    const databaseDeletingResult = await prisma_client_1.default.mailTemplate.delete({ where: { id } });
    return databaseDeletingResult;
};
const getMailTemplatesList = async (filteringParams) => {
    const { page, pageSize } = filteringParams;
    const skip = (page - 1) * pageSize;
    const databaseResult = await prisma_client_1.default.mailTemplate.findMany({
        skip,
        take: pageSize
    });
    return databaseResult;
};
exports.default = {
    createMailTemplates,
    getMailTemplatesList,
    deleteMailTemplateById,
    getMailTemplateDataById,
};
//# sourceMappingURL=mail-templates.service.js.map