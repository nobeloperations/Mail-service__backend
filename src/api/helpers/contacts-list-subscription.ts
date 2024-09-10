import { Contact } from "@prisma/client";
import createNameForContactsList from '../helpers/create-list-name';
import prismaClient from '../../database/prisma-client';
import createContactsList from '../services/contacts-lists.service'


export const subscribeToRelevantList = async (contact) => {
    if(contact.eduQuestSelectedDateTime) {
        const isListExist = await prismaClient.contactstList.findUnique({ where: { eduQuestStartDate: contact.eduQuestSelectedDateTime } });

        if(isListExist) {
        const { id } = isListExist
        await updateContactIds(id, contact.id)
        } else {
            const name = createNameForContactsList(contact.eduQuestSelectedDateTime)
            await createContactsList.createContactsList({name, eduQuestStartDate: contact.eduQuestSelectedDateTime,  contacts: {connect: [{ id: contact.id }]}})
        }
    } else {
        await updateContactIds('Future List', contact.id)
    }

    return await prismaClient.contact.findUnique({ where: { id: contact.id }})
}

const updateContactIds = async (identifier: string, contactId: string) => {
    const { contactIds, id } = identifier === 'Future List' 
    ? await prismaClient.contactstList.findUnique({ where: { name: identifier } }) 
    : await prismaClient.contactstList.findUnique({ where: { id: identifier } });

    if (!contactIds.includes(contactId)) {
        await prismaClient.contactstList.update({
            where: { id },
            data: {
              contacts: {
                connect: [{ id: contactId }],
              },
            },
          });
    }
};