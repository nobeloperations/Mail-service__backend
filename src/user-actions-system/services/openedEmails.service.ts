import prismaClient from '../../database/prisma-client';

const emailOpenTracking = async (emailId: string) => {
    const {contactId} = await prismaClient.sentMail.update({
        where: {
            emailId
        },
        data: {
            emailStatus: "OPENED"
        }
    })

    await prismaClient.contactsActions.create({
        data: {
            contactId,
            typeOfActivity: "EMAIL",
            activityDescription: "Email was opened"
        }
    })
}

export default {
    emailOpenTracking
}