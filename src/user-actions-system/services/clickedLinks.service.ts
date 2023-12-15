import prismaClient from '../../database/prisma-client';
import descriptionGenerator from '../helpers/descriptionCreator';

const emailLinkTracking = async (emailId: string, linkName: string) => {
    const { templateId, contactId } = await prismaClient.sentMail.findUnique({
        where: {
            emailId
        }
    })
    const activityDescription = await descriptionGenerator.generateDescriptionForLinksActions(templateId, linkName)

    await prismaClient.contactsActions.create({
        data: {
            contactId,
            typeOfActivity: "LINK",
            activityDescription
        }
    })
}

export default {
    emailLinkTracking
}