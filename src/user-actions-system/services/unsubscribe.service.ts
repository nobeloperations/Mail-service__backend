import prismaClient from '../../database/prisma-client';

const unsubscribe = async (id: string) => {
    await prismaClient.contact.update({ 
        where: {
            id
        }, 
        data: {
            isSubscribed: false
        }
    })

    await prismaClient.contactsActions.create({
        data: {
            contactId: id,
            typeOfActivity: "UNSUBSCRIBE",
            activityDescription: "User was unsubscribed success"
        }
    })
}

export default { unsubscribe }