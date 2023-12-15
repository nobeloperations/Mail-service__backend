import prismaClient from '../../database/prisma-client';
import descriptionGenerator from '../helpers/descriptionCreator';

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

    await prismaClient.contactsActions.create({
        data: {
            contactId: id,
            typeOfActivity: "UNSUBSCRIBE",
            activityDescription
        }
    })
}

export default { unsubscribe }