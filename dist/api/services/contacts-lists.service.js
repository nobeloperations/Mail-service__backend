"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const timestamp_generator_1 = __importDefault(require("../../utils/helpers/dynamic-fields-generators/timestamp.generator"));
const createContactsList = async (contactListData) => {
    const result = await prisma_client_1.default.contactstList.create({ data: contactListData });
    return result;
};
const updateContactListById = async (id, contactsListData) => {
    const result = await prisma_client_1.default.contactstList.update({
        where: { id },
        data: contactsListData,
        select: {
            id: true,
            name: true,
            eduQuestStartDate: true,
            createdAt: true
        }
    });
    return result;
};
const deleteContactsListById = async (id) => {
    const result = await prisma_client_1.default.contactstList.delete({ where: { id } });
    return result;
};
const getListContactsLists = async (filteringParams) => {
    const { page, pageSize, sortOrder } = filteringParams;
    const skip = (page - 1) * pageSize;
    const listOfContactsLists = await prisma_client_1.default.contactstList.findMany({
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
const addContacListToMailingAutomation = async (listId, mailingAutomationId) => {
    const { contactIds, intake, name: contactListName } = await prisma_client_1.default.contactstList.findUnique({
        where: { id: listId },
        include: {
            intake: true
        }
    });
    const { automationScheduledMails } = await prisma_client_1.default.mailingAutomation.findUnique({
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
    await prisma_client_1.default.scheduledMail.createMany({ data: scheduledMailsForContacts });
    const connectData = contactIds.map(contactId => ({
        contactId,
        mailingAutomationId
    }));
    const result = await prisma_client_1.default.contactMailingAutomation.createMany({ data: connectData });
    return result;
};
const updateMembersEqDate = async (listId) => {
    const contactListData = await prisma_client_1.default.contactstList.findUnique({ where: { id: listId } });
    if (!contactListData || !contactListData.eduQuestStartDate) {
        return null;
    }
    const { contactIds, eduQuestStartDate: listEqDate } = contactListData;
    const contactData = await prisma_client_1.default.contact.findMany({ where: { id: { in: contactIds } } });
    const contactsGroupedByTimezone = contactData.reduce((acc, contact) => {
        const timezone = contact.timezone;
        if (!acc[timezone]) {
            acc[timezone] = [];
        }
        acc[timezone].push(contact.id);
        return acc;
    }, {});
    const updatePromises = Object.entries(contactsGroupedByTimezone).map(async ([timezone, contactIds]) => {
        return prisma_client_1.default.contact.updateMany({
            where: { id: { in: contactIds } },
            data: {
                eduQuestSelectedDateTime: listEqDate,
                eduQuestEventTimestamp: (0, timestamp_generator_1.default)(timezone, listEqDate)
            }
        });
    });
    const result = await Promise.all(updatePromises);
    return { updatedContactsCount: result.reduce((acc, data) => acc += data.count, 0) };
};
const mergeLists = async (targetListId, listIdToMerge) => {
    const { contactIds: contactsIdsToMerge } = await prisma_client_1.default.contactstList.findUnique({ where: { id: listIdToMerge } });
    const merginResult = await prisma_client_1.default.contactstList.update({
        where: { id: targetListId },
        data: {
            contacts: {
                connect: contactsIdsToMerge.map(id => ({ id }))
            }
        }
    });
    return merginResult;
};
exports.default = {
    mergeLists,
    createContactsList,
    updateMembersEqDate,
    getListContactsLists,
    updateContactListById,
    deleteContactsListById,
    addContacListToMailingAutomation,
};
//# sourceMappingURL=contacts-lists.service.js.map