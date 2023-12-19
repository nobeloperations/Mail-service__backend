import { FileArray, UploadedFile } from 'express-fileupload';

import prismaClient from '../../database/prisma-client';
import BaseApiError from '../../utils/errors/custom-api-errors';
import GoogleDriveMaiTemplatesService from '../../infrustructure/services/google-services/mail-templates.driver-service';


const getMailTemplateDataById = async (id: string) => {
    const databaseResult = await prismaClient.mailTemplate.findUnique({ where: { id } });
    
    if (!databaseResult) {
        throw BaseApiError.NotFound(`The requested resource with id - ${id} could not be found on the server`);
    }

    const templateFileData = await GoogleDriveMaiTemplatesService.getMailTemplateFileDataById(databaseResult.googleDriveFileId);

    return templateFileData;
};

const createMailTemplates = async (files: FileArray) => {
    for (const fileName in files) {
        const targetUploadedMailTemplateFile = files[fileName] as UploadedFile;

        const googleDriveCreationResult = await GoogleDriveMaiTemplatesService.createNewMailTemplateFile(fileName, targetUploadedMailTemplateFile);
        const databaseCreationResult = await prismaClient.mailTemplate.create({
            data: {
                name: fileName,
                googleDriveFileId: googleDriveCreationResult.data.id,
            }
        });
    }
};

const deleteMailTemplateById = async (id: string) => {
    const databaseSearchingResult = await prismaClient.mailTemplate.findUnique({ where: { id } });

    if (!databaseSearchingResult) {
        throw BaseApiError.NotFound(`The requested resource with id - ${id} could not be found on the server`);
    }

    const deleteFromGoogleDriveResult = await GoogleDriveMaiTemplatesService.deleteMailTemplateFileById(databaseSearchingResult.googleDriveFileId);
    const databaseDeletingResult = await prismaClient.mailTemplate.delete({ where: { id } })

    return databaseDeletingResult;
};

const getMailTemplatesList = async (filteringParams: ApiResourceFilteringParams) => {
    const { page, pageSize } = filteringParams;
    const skip = (page - 1) * pageSize;

    const databaseResult = await prismaClient.mailTemplate.findMany({
        skip,
        take: pageSize
    });

    return databaseResult;
};

export default {
    createMailTemplates,
    getMailTemplatesList,
    deleteMailTemplateById,
    getMailTemplateDataById,
};