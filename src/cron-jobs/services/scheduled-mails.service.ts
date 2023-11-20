import prismaClient from '../../database/prisma-client';

const retrievePendingMails = async () => {
    const currentDateTime = new Date();
    const mails = await prismaClient.scheduledMails.findMany({
        where: {
            scheduledDate: {
                lte: currentDateTime
            }
        }
    });

    return mails;
};

export default {
    retrievePendingMails
}