"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const googleapis_1 = require("googleapis");
const auth_google_client_1 = __importDefault(require("./auth-google-client"));
const googleDriveClient = googleapis_1.google.drive({ version: 'v3', auth: auth_google_client_1.default });
const createNewMailTemplateFile = async (templateName, templateFile) => {
    const templateFileStream = new stream_1.Readable();
    templateFileStream.push(templateFile.data);
    templateFileStream.push(null);
    const createdFile = await googleDriveClient.files.create({
        requestBody: {
            name: templateName,
            mimeType: 'text/html',
            parents: ['183Sg_7KPVGeqZT_1nT4GTq9Y43gw88uB'],
        },
        media: {
            mimeType: 'text/html',
            body: templateFileStream
        }
    });
    return createdFile;
};
const getMailTemplateFileDataById = async (fileId) => {
    const response = await googleDriveClient.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' });
    return new Promise((resolve, reject) => {
        let data = '';
        response.data
            .on('data', chunk => data += chunk)
            .on('end', () => {
            resolve(data);
        });
        //TODO: Handle error while reading file
    });
};
const updateMailTemplateFileById = async (fileId, data) => {
    const updatedFile = await googleDriveClient.files.update({
        fileId: fileId,
        media: {
            mimeType: 'text/html',
            body: data
        }
    });
    console.log(updatedFile);
    return updatedFile;
};
const deleteMailTemplateFileById = async (fileId) => {
    const deletedFile = await googleDriveClient.files.delete({
        fileId: fileId,
    });
    return deletedFile;
};
exports.default = {
    createNewMailTemplateFile,
    updateMailTemplateFileById,
    deleteMailTemplateFileById,
    getMailTemplateFileDataById,
};
//# sourceMappingURL=mail-templates.driver-service.js.map