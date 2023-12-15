import prismaClient from '../../database/prisma-client';
import descriptionGenerator from '../helpers/descriptionCreator';

const emailOpenTracking = async (emailId: string) => {
    const {contactId, templateId} = await prismaClient.sentMail.update({
        where: {
            emailId
        },
        data: {
            emailStatus: "OPENED"
        }
    })

    const activityDescription = await descriptionGenerator.generateDescriptionForEmailsActions(templateId)

    await prismaClient.contactsActions.create({
        data: {
            contactId,
            typeOfActivity: "EMAIL",
            activityDescription
        }
    })
}

export default {
    emailOpenTracking
}