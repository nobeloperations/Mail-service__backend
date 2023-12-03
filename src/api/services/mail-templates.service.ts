import { FileArray, UploadedFile } from 'express-fileupload';

import prismaClient from '../../database/prisma-client';
import GoogleDriveMaiTemplatesService from '../../google-services/mail-templates.driver-service';


const getMailTemplateDataById = async (id: string) => {
    const databaseResult = await prismaClient.mailTemplate.findUnique({ where: { id } });

    if (!databaseResult) {
        //TODO: API Errors
        throw new Error('Not found');
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

    const deleteFromGoogleDriveResult = await GoogleDriveMaiTemplatesService.deleteMailTemplateFileById(databaseSearchingResult.googleDriveFileId);
    const databaseDeletingResult = await prismaClient.mailTemplate.delete({ where: { id } })

    return databaseDeletingResult;
};

const getMailTemplatesList = async (paginationOptions: PaginationOptions) => {
    const { page, pageSize } = paginationOptions;
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