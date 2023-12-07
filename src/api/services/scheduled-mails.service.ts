import { Prisma } from '@prisma/client';

import prismaClient from '../../database/prisma-client';
import BaseApiError from '../../utils/errors/custom-api-errors'; 

const createMails = async (mailsData: Prisma.ScheduledMailCreateManyInput) => {
    const result = await prismaClient.scheduledMail.createMany({ data: mailsData });
    return result;
};

const getMailById = async (id: string) => {
    const result = await prismaClient.scheduledMail.findUnique({ where: { id } });

    if (!result) {
        throw BaseApiError.NotFound(`The requested resource with id - ${id} could not be found on the server`);
    }

    return result;
};

const deleteMailById = async (id: string) => {
    const result = await prismaClient.scheduledMail.delete({ where: { id } });
    return result;
};

const updateMailById = async (id: string, mailData: Prisma.ScheduledMailUpdateInput) => {
    const result = await prismaClient.scheduledMail.update({ where: { id }, data: mailData });
    return result;
};

const getMailsList = async () => {
    const result = await prismaClient.scheduledMail.findMany();
    return result;
};


export default {
    createMails,
    getMailById,
    deleteMailById,
    updateMailById,
    getMailsList,
};