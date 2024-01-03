import { Prisma } from '@prisma/client';
import prismaClient from '../../database/prisma-client';


const createContactsList = async (contactListData: Prisma.ContactstListCreateInput) => {
    const result = await prismaClient.contactstList.create({ data: contactListData });
    return result;
};

const updateContactListById = async (id: string, contactsListData: Prisma.ContactstListUpdateInput) => {
    const result = await prismaClient.contactstList.update({
        where: { id },
        data: contactsListData,
        select: {
            id: true,
            name: true,
            eduQuestStartDate: true,
            createdAt: true
        }
    },);

    return result;
};

const deleteContactsListById = async (id: string) => {
    const result = await prismaClient.contactstList.delete({ where: { id } });
    return result;
};

const getListContactsLists = async (filteringParams: ApiResourceFilteringParams) => {
    const { page, pageSize } = filteringParams;
    const skip = (page - 1) * pageSize;

    const listOfContactsLists = await prismaClient.contactstList.findMany({
        skip,
        take: pageSize,
        include: {
            contacts: true
        }
    });

    return (await listOfContactsLists).map(list => ({
        ...list,
        contactsCount: list.contactIds.length,
        contactIds: undefined,
        contacts: undefined
    }));
};

export default {
    createContactsList,
    updateContactListById,
    deleteContactsListById,
    getListContactsLists,
};