import prismaClient from '../../database/prisma-client';

const emailLinkTracking = async (contactId: string) => {
    await prismaClient.contactsActions.create({
        data: {
            contactId,
            typeOfActivity: "LINK",
            activityDescription: "Link was clicked"
        }
    })
}

export default {
    emailLinkTracking
}