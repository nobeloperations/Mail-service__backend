import { Prisma, MailingProfile, InternShipProgramType } from '@prisma/client';
import prismaClient from '../../database/prisma-client';

import generateEqTimestampFieldBasedOnEqSelectedDate from '../../utils/helpers/dynamic-fields-generators/timestamp.generator';


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
    const { page, pageSize, sortOrder } = filteringParams;
    const skip = (page - 1) * pageSize;

    const listOfContactsLists = await prismaClient.contactstList.findMany({
        skip,
        take: pageSize,
        include: {
            contacts: true
        },
        orderBy: {
            createdAt: sortOrder
        }
    });

    return (await listOfContactsLists).map(list => ({
        ...list,
        contactsCount: list.contactIds.length,
        contactIds: undefined,
        contacts: undefined
    }));
};

const addContacListToMailingAutomation = async (listId: string, mailingAutomationId: string) => {
    const { contactIds, intake, name: contactListName } = await prismaClient.contactstList.findUnique({ 
        where: { id: listId } ,
        include: {
            intake: true
        }
    });

    
    const { automationScheduledMails } = await prismaClient.mailingAutomation.findUnique({ 
        where: { id: mailingAutomationId }, 
        include: { automationScheduledMails: true }
    });

    const targetMailingProfileId = contactListName.includes('Weekday') ? '66352e3d0695e98138ae063f' : '66352ecb0695e98138ae0640';

    const scheduledMailsForContacts = contactIds.map(contactId => {
        return automationScheduledMails.map(({ id, ...scheduledMailData }) => ({
            contactId,
            subject: 'EduQuest reminders',
            mailingAutomationId,
            mailingProfileId: targetMailingProfileId,
            ...scheduledMailData, 
        }));
    }).flat();

    await prismaClient.scheduledMail.createMany({ data: scheduledMailsForContacts });

    const connectData = contactIds.map(contactId => ({
        contactId,
        mailingAutomationId
    }));
    
    const result = await prismaClient.contactMailingAutomation.createMany({ data: connectData });

    return result;
};

const updateMembersEqDate = async (listId: string) => {
    const contactListData = await prismaClient.contactstList.findUnique({ where: { id: listId } });

    if (!contactListData || !contactListData.eduQuestStartDate) {
        return null;
    }

    const { contactIds, eduQuestStartDate: listEqDate } = contactListData;

    const contactData = await prismaClient.contact.findMany({ where: { id: { in: contactIds } } });

    const contactsGroupedByTimezone = contactData.reduce((acc, contact) => {
        const timezone = contact.timezone;
        if (!acc[timezone]) {
            acc[timezone] = [];
        }
        acc[timezone].push(contact.id);
        return acc;
    }, {});

    const updatePromises = Object.entries(contactsGroupedByTimezone).map(async ([timezone, contactIds]) => {
        return prismaClient.contact.updateMany({
            where: { id: { in: contactIds as string[] } },
            data: {
                eduQuestSelectedDateTime: listEqDate,
                eduQuestEventTimestamp: generateEqTimestampFieldBasedOnEqSelectedDate(timezone, listEqDate)
            }
        });
    });

    const result = await Promise.all(updatePromises);

    return { updatedContactsCount: result.reduce((acc, data) => acc += data.count, 0) };
};

const mergeLists = async (targetListId: string, listIdToMerge: string) => {
    const { contactIds: contactsIdsToMerge } = await prismaClient.contactstList.findUnique({ where: { id: listIdToMerge } });

    const merginResult = await prismaClient.contactstList.update({
        where: { id: targetListId },
        data: {
            contacts: {
                connect: contactsIdsToMerge.map(id => ({ id }))
            }
        }
    });

    return merginResult;
};

export default {
    mergeLists,
    createContactsList,
    updateMembersEqDate,
    getListContactsLists,
    updateContactListById,
    deleteContactsListById,
    addContacListToMailingAutomation,
};