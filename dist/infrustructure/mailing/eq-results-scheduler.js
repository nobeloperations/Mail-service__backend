// import { EduQuestDecision } from '@prisma/client';
// import prismaClient from '../../database/prisma-client';
// import ScheduledMailService from '../../api/services/scheduled-mails.service';
// enum EventType {
//     MAIN,
//     BACKUP,
// }
// const EQ_RESULTS_TEMPLATES_NAMES = [
//     'EQ_MAIN_EVENT_SELECTED_DECISION', 'EQ_BACKUP_EVENT_SELECTED_DECISION',
//     'EQ_MAIN_EVENT_TRY_AGAIN_DECISION', 'EQ_BACKUP_EVENT_TRY_AGAIN_DECISION',
//     'EQ_MAIN_EVENT_ENGLISH_ISSUE_DECISION', 'EQ_BACKUP_EVENT_ENGLISH_ISSUE_DECISION',
//     'EQ_MAIN_EVENT_BEHAVIOR_ISSUE_DECISION', 'EQ_BACKUP_EVENT_BEHAVIOR_ISSUE_DECISION',
//     'EQ_MAIN_EVENT_AUDIO_ISSUE_DECISION', 'EQ_BACKUP_EVENT_AUDIO_ISSUE_DECISION',
//     'EQ_MAIN_EVENT_PREFERRED_DEVICE_DECISION', 'EQ_BACKUP_EVENT_PREFERRED_DEVICE_DECISION',
//     'EQ_MAIN_EVENT_BACKGROUND_NOISES_DECISION', 'EQ_BACKUP_EVENT_BACKGROUND_NOISES_DECISION',
//     'EQ_MAIN_EVENT_POOR_INTERNET_CONNECTION_DECISION', 'EQ_BACKUP_EVENT_POOR_INTERNET_CONNECTION_DECISION',
// ];
// const retrieveMailTemplateDataForEqDecision = async() => {
//     const mailTemplatesData = await prismaClient.mailTemplate.findMany();
//     const missingTemplates = EQ_RESULTS_TEMPLATES_NAMES.filter(templateName => 
//         !mailTemplatesData.some(templateData => templateData.name === templateName)
//     );
//     if (missingTemplates.length > 0) {
//         throw new Error(`Templates with EQ event decision are missing: ${missingTemplates.join(', ')}`);
//     }
//     return mailTemplatesData.filter(templateData => 
//         EQ_RESULTS_TEMPLATES_NAMES.includes(templateData.name)
//     );
// };
// const blabla = () => {
//     const templatesData = await retrieveMailTemplateDataForEqDecision();
//     const filterMailTemplateDataByEventType = 
// };
// const setPendingMailsWithEqDecison = async (contactsEmails: string[]) => {
//     const templatesDataHasmap
//     for (const contactData of contactsData) {
//         const creationResult = await 
//     }
// };
//# sourceMappingURL=eq-results-scheduler.js.map