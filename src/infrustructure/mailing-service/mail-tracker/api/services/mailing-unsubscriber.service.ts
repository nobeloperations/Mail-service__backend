import prismaClient from '../../../../../database/prisma-client';

const unsubscribeContactFromMailing = async (sentMailId: string) => {
    const targetRecord = await prismaClient.sentMail.findUnique({ where: { emailId: sentMailId } });

    if (!targetRecord) return;

    const unsubscribingResult = await prismaClient.contact.update({
        where: { id: targetRecord.contactId },
        data: {
            isSubscribed: false,
        }
    });

    return unsubscribingResult;
};

export default {
    unsubscribeContactFromMailing
};

