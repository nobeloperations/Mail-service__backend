// import { Prisma } from '@prisma/client';
// import prismaClient from '../../database/prisma-client';

// const createMailingAutomation = async (mailingAutomationData: Prisma.MailingAutomationCreateInput) => {

// };

// const updateMailingAutomationById = async (id: string, mailingAutomationData: Prisma.MailingAutomationUpdateInput) => {

// };

// const deleteMailingAutomationById = async (id: string) => {

// };

// const getMailingAutomationById = async (id: string) => {
// };

// const getMailingAutomationsList = async (filteringParams: ApiResourceFilteringParams) => {
//     const { search, page, pageSize } = filteringParams;
//     const skip = (page - 1) * pageSize;

//     const result = await prismaClient.mailingAutomation.findMany({
//         skip,
//         take: pageSize,
//         where: {
//             name: { contains: search }
//         },
//     });

//     return result;
// };

// const addContactToAutomation = async (contactIds: string[], mailingAutomationId: string) => {
//     const targetAutomationDetails = await prismaClient.mailingAutomation.findUnique({ 
//         where: { id: mailingAutomationId }, 
//         include: { automationScheduledMails: true }
//     });

//     const automationScheduledMails = targetAutomationDetails.automationScheduledMails;

//     for (const targetContactId of contactIds) {
//         const scheduledMailsForContact = automationScheduledMails.map((scheduledMailData) => {
//             return {
//                 contactId: targetContactId,
//                 ...scheduledMailData,
//                 mailingAutomationId
//             };
//         });

//         await prismaClient.scheduledMail.createMany({ data: scheduledMailsForContact });
//     }
// };

// const removeContactsFromAutomation = async (contactIds: string[], mailingAutomationId: string) => {
//     const removingResult = await prismaClient.scheduledMail.deleteMany({ 
//         where: { 
//             contactId: { in: contactIds },
//             mailingAutomationId: mailingAutomationId 
//         }
//     });

//     return removingResult;
// };

// export default {
//     createMailingAutomation,
//     updateMailingAutomationById,
//     deleteMailingAutomationById,
//     getMailingAutomationById,
//     getMailingAutomationsList,
//     addContactToAutomation,
//     removeContactsFromAutomation
// };