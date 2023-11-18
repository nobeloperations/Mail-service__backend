import { Prisma } from '@prisma/client';
import prismaClient from '../../database/prisma-client';

const createMails = async (mailsData: Prisma.ScheduledMailsCreateManyInput) => {
    const result = await prismaClient.scheduledMails.createMany({ data: mailsData });
    return result;
};

const getMailById = async (id: string) => {
    const result = await prismaClient.scheduledMails.findUnique({ where: { id } });
    return result;
};

const deleteMailById = async (id: string) => {
    const result = await prismaClient.scheduledMails.delete({ where: { id } });
    return result;
};

const updateMailById = async (id: string, mailData: Prisma.ScheduledMailsUpdateInput) => {
    const result = await prismaClient.scheduledMails.update({ where: { id }, data: mailData });
    return result;
};

const getMailsList = async () => {
    const result = await prismaClient.scheduledMails.findMany();
    return result;
};

const getPendingMailsList = async () => {};

export default {
    createMails,
    getMailById,
    deleteMailById,
    updateMailById,
    getMailsList,
    getPendingMailsList
};