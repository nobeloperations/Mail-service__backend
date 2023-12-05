import prismaClient from '../../database/prisma-client';

const retrievePendingMails = async () => {
    const currentDateTime = new Date();
    const mails = await prismaClient.scheduledMail.findMany({
        where: {
            scheduledDate: {
                lte: currentDateTime
            }
        }
    });

    return mails;
};

const deletePendingMail = async (id: string) => {
    const mail = await prismaClient.scheduledMail.delete({
        where: {
          id,
        },
      })

      return mail
}
export default {
    retrievePendingMails,
    deletePendingMail
}