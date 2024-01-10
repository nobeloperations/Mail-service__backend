import { Prisma } from '@prisma/client';
import prismaClient from '../../database/prisma-client';

import BaseApiError from '../../utils/http-errors'; 


const createMailingAutomation = async (mailingAutomationData: Prisma.MailingAutomationCreateInput) => {
    const { automationScheduledMails, ...automationData } = mailingAutomationData;
    const result = await prismaClient.mailingAutomation.create({ 
        data: {
            ...automationData,
            automationScheduledMails: {
                createMany: {
                    data: automationScheduledMails as Prisma.AutomationScheduledMailCreateManyInput
                }
            }
        }
        
    });

    return result;
};

const updateMailingAutomationById = async (id: string, mailingAutomationData: Prisma.MailingAutomationUpdateInput) => {
    const { automationScheduledMails, ...automationData } = mailingAutomationData;

    const result = await prismaClient.mailingAutomation.update({
        where: { id },
        data: {
            ...automationData,
            automationScheduledMails: {
            update: (automationScheduledMails as any[])
                .filter(mail => mail.id)
                .map(({ id, ...restMailData }) => ({ where: { id }, data: restMailData })),
            create: (automationScheduledMails as Prisma.AutomationScheduledMailCreateInput[])
                .filter(mail => !mail.id)
                .map(mailData => mailData),
            },
        },
    });

    return result;
};

const deleteMailingAutomationById = async (id: string) => {
    const result = await prismaClient.mailingAutomation.delete({
        where: { id }
    });

    return result;
};

const getMailingAutomationById = async (id: string) => {
    const result = prismaClient.mailingAutomation.findUnique({
        where: { id },
        include: { 
            automationScheduledMails: {
                include: {
                    template: true
                }
            }
        }
    });

    if (!result) {
        throw BaseApiError.NotFound(`The requested resource with id - ${id} could not be found on the server`);
    }

    return result;
};

const getMailingAutomationsList = async (filteringParams: ApiResourceFilteringParams) => {
    const { search, page, pageSize } = filteringParams;
    const skip = (page - 1) * pageSize;

    const result = await prismaClient.mailingAutomation.findMany({
        skip,
        take: pageSize,
        where: {
            name: { 
                contains: search 
            }
        },
        include: {
            automationScheduledMails: {
                include: {
                    template: true
                }
            }
        }
    });

    return result;
};

const addContactsToAutomation = async (mailingAutomationId: string, contactIds: string[]) => {
    const targetAutomationDetails = await prismaClient.mailingAutomation.findUnique({ 
        where: { id: mailingAutomationId }, 
        include: { automationScheduledMails: true }
    });

    const automationScheduledMails = targetAutomationDetails.automationScheduledMails;

    for (const targetContactId of contactIds) {
        const scheduledMailsForContact = automationScheduledMails.map((scheduledMailData) => {
            return {
                contactId: targetContactId,
                ...scheduledMailData,
                mailingAutomationId
            };
        });

        await prismaClient.scheduledMail.createMany({ data: scheduledMailsForContact });
    }
};

const removeContactsFromAutomation = async (mailingAutomationId: string, contactIds: string[]) => {
    const removingResult = await prismaClient.scheduledMail.deleteMany({ 
        where: { 
            contactId: { in: contactIds },
            mailingAutomationId: mailingAutomationId 
        }
    });

    return removingResult;
};

export default {
    createMailingAutomation,
    updateMailingAutomationById,
    deleteMailingAutomationById,
    getMailingAutomationById,
    getMailingAutomationsList,
    addContactsToAutomation,
    removeContactsFromAutomation
};