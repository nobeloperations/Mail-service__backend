"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactData_1 = __importDefault(require("../services/contactData"));
const sended_mails_1 = __importDefault(require("../services/sended-mails"));
const scheduled_mails_service_1 = __importDefault(require("../services/scheduled-mails.service"));
const mail_sender_service_1 = __importDefault(require("../../infrustructure/services/mail/mail-sender.service"));
const mail_composer_service_1 = __importDefault(require("../../infrustructure/services/mail/mail-composer.service"));
const mail_time_coordinator_service_1 = __importDefault(require("../../infrustructure/services/mail/mail-time-coordinator.service"));
const sentPendingMails = async () => {
    const pendingMails = await scheduled_mails_service_1.default.retrievePendingMails();
    //TODO: Handle an error if it was not possible to send a mail
    for (const processedSheduledMailData of pendingMails) {
        const { contactId, id, templateId, ...scheduledMailData } = processedSheduledMailData;
        const contactData = await contactData_1.default.retrieveContactData(contactId);
        if (mail_time_coordinator_service_1.default.isTimeToSendMail(processedSheduledMailData, contactData)) {
            const composedMail = await mail_composer_service_1.default.composeMail(contactData, templateId);
            await mail_sender_service_1.default.sentComposedMail(contactData.email, composedMail);
            // await ScheduledMailsService.deletePendingMail(id);
            await sended_mails_1.default.addSendedMail(processedSheduledMailData);
        }
    }
};
exports.default = sentPendingMails;
//# sourceMappingURL=sent-pending-mails.js.map