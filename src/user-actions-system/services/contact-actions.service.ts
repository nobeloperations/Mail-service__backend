import prismaClient from '../../database/prisma-client';
import descriptionGenerator from '../helpers/descriptionCreator';
import { ContactsActions } from "@prisma/client";

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
            templateId,
            activityDescription
        }
    })
}

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
            templateId,
            activityDescription
        }
    })
}

const unsubscribe = async (id: string) => {
    const { email } = await prismaClient.contact.update({ 
        where: {
            id
        }, 
        data: {
            isSubscribed: false
        }
    })

    const activityDescription = descriptionGenerator.generateDescriptionForUnsubscribeAction(email)

    await prismaClient.unsubscribedUsers.create({
        data: {
            contactId: id,
            activityDescription
        }
    })
}

const unsubscribedContactsList = async () => {
    return await prismaClient.unsubscribedUsers.findMany({})
}

const unsubscribedContact = async (id: string) => {

    return await prismaClient.unsubscribedUsers.findUnique({
        where: {
            id
        }
    })
}

const contactActions = async (contactId: string, typeOfActivity: string | null) => {
    const objectQuery = typeOfActivity ? { contactId, typeOfActivity: { equals: typeOfActivity as ContactsActions["typeOfActivity"] } } : { contactId };

    return await prismaClient.contactsActions.findMany({
        where: objectQuery
    })
}

export default {
    emailLinkTracking,
    emailOpenTracking,
    contactActions,
    unsubscribe,
    unsubscribedContact,
    unsubscribedContactsList
}