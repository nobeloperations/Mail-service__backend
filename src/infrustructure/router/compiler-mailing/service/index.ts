import { Prisma } from '@prisma/client';
import prismaClient from '../../../../database/prisma-client';

interface ExtendedRecipient {
    id: string;
    email: string;
    timezone: string;
};

interface CompilerMailingData {
    subject: string;
    templateId: string;
    recipientsData: string[];
    additionalData: Object;
    additionalFlags: Object;
};

const setCompilerMailing = async (data: CompilerMailingData) => {
    const { extendedRecipientData, notFoundRecipients } = await getExtendedRecipientData(data.recipientsData);

    if (extendedRecipientData.length <= 0) {
        return notFoundRecipients;
    }

    const scheduledMails: Prisma.ScheduledMailCreateManyInput[] = extendedRecipientData.map(recipientData => {
        const mailObject = {
            subject: data.subject,
            scheduledDate: new Date(),
            useContactTimezone: false,
            contactId: recipientData.id,
            templateId: data.templateId,
            mailingProfileId: '661f9c1f902d20dd197380e9',
            additionalData: JSON.parse(JSON.stringify(data.additionalData)),
        }

        if (data.additionalFlags && Object.keys(data.additionalFlags).length > 0) {
            mailObject['additionalFlags'] = JSON.parse(JSON.stringify(data.additionalFlags));
        }

        return mailObject;
    });

    await prismaClient.scheduledMail.createMany({ data: scheduledMails });

    return notFoundRecipients;
};

const getExtendedRecipientData = async (recipeintEmails: string[]): Promise<any> => {
    const databaseResult = await prismaClient.contact.findMany({
        where: {
            email: {
                in: recipeintEmails
            }
        },
        select: {
            id: true, 
            email: true,
            timezone: true
        }
    });

    const notFoundRecipients = recipeintEmails.filter(email => {
        return !databaseResult.some(obj => obj.email === email);
    });

    return {
        notFoundRecipients,
        extendedRecipientData: databaseResult
    };
};

export default {
    setCompilerMailing
};