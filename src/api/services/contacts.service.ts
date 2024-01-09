import { Prisma } from '@prisma/client';
import prismaClient from '../../database/prisma-client';
import { subscribeToRelevantList } from '../helpers/contacts-list-subscription';
import { ContactsActions } from "@prisma/client";
import { generateTimestampField } from '../helpers/generate-timestamp';

const createContact = async (contactData: Prisma.ContactCreateInput) => {
    const isContactExist = await prismaClient.contact.findUnique({ where: { email: contactData.email } });

    if(!isContactExist){
        const eduQuestEventTimestamp = generateTimestampField(contactData.timezone, contactData.eduQuestSelectedDateTime)
        const contact = await prismaClient.contact.create({ data: {...contactData, eduQuestEventTimestamp} });
        const subscriptionResult = await subscribeToRelevantList(contact)

        return subscriptionResult
    } else {
        const eduQuestEventTimestamp = generateTimestampField(contactData.timezone, contactData.eduQuestSelectedDateTime)
        const updatedContact = await updateContactById(isContactExist.id, {...contactData, eduQuestEventTimestamp})
        await subscribeToRelevantList({...updatedContact, eduQuestSelectedDateTime: contactData.eduQuestSelectedDateTime})

        return updatedContact
    }
};

const deleteContactById=async(id:string)=>{
const contact = await prismaClient.contact.findUnique({
    where: { id: id },
    include: { lists: true }
  });

  console.log(contact.listIds[0])

  const updateListsPromises = contact.listIds.map(list =>
    prismaClient.contactstList.update({
      where: { id: list},
      data: { contacts: { disconnect: { id: id } } }
    })
  );
  await Promise.all(updateListsPromises);

  const result = await prismaClient.contact.delete({
    where: { id: id }
  });
    return result;
}

const updateContactById = async (id: string, contactData: Prisma.ContactUpdateInput) => {
    const result = await prismaClient.contact.update({ where: { id }, data: contactData });
    return result;
};

const getContactById = async (id:string)=>{
    const result=await prismaClient.contact.findUnique({where:{id}});
    return result;
};

const getContactList = async (filteringParams: ApiResourceFilteringParams) => {
    const { search, page, pageSize } = filteringParams;
    const skip = (page - 1) * pageSize;

    const whereCondition = {
        OR: [
            { email: { contains: search } },
            { firstName: { contains: search } },
            { lastName: { contains: search } },
        ],
    };

    const contacts = await prismaClient.contact.findMany({
        skip,
        take: pageSize,
        where: whereCondition,
    });

    const contactsCount = await prismaClient.contact.count()

    return {
        contacts,
        contactsCount
    };
};  

const batchUpdatingContacts = async (updatingData: { contactIds: string[], updates: Prisma.ContactUpdateInput }) => {
    const { contactIds, updates } = updatingData;

    const result = await prismaClient.contact.updateMany({
        where: {
            id: {
                in: contactIds,
            },
        },
        data: updates,
    });

    return result;
};


const batchDeletingContacts = async (deletingData: { contactIds: string[] }) => {
    const result = await prismaClient.contact.deleteMany({
        where: {
            id: {
                in: deletingData.contactIds,
            },
        },
    });

    return result;
};

const getContactActions = async (contactId: string, typeOfActivity: string | null) => {
    const objectQuery = typeOfActivity ? { contactId, typeOfActivity: { equals: typeOfActivity as ContactsActions["typeOfActivity"] } } : { contactId };

    return await prismaClient.contactsActions.findMany({
        where: objectQuery
    })
}

export default{
    createContact,
    getContactById,
    getContactList,
    deleteContactById,
    updateContactById,
    batchUpdatingContacts,
    batchDeletingContacts,
    getContactActions
};
