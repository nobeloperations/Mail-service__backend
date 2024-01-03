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
const uniqueEmailDecorator_1 = __importDefault(require("../../user-actions-system/helpers/uniqueEmailDecorator"));
const sentPendingMails = async () => {
    const pendingMails = await scheduled_mails_service_1.default.retrievePendingMails();
    pendingMails.forEach(async (processedSheduledMailData) => {
        const { contactId, id, templateId, useContactTimezone, mailingAutomationId, ...restOfFields } = processedSheduledMailData;
        const contactData = await contactData_1.default.retrieveContactData(contactId);
        if (mail_time_coordinator_service_1.default.isTimeToSendMail(processedSheduledMailData, contactData) && contactData.isSubscribed) {
            const composedMail = await mail_composer_service_1.default.composeMail(contactData, templateId);
            const composedIdentifiedMail = (0, uniqueEmailDecorator_1.default)(composedMail, { contactId, emailId: id });
            await mail_sender_service_1.default.sentComposedMail(contactData.email, composedIdentifiedMail);
            await scheduled_mails_service_1.default.deletePendingMail(id);
            await sended_mails_1.default.addSendedMail({ emailId: id, contactId, templateId, ...restOfFields });
        }
    });
};
exports.default = sentPendingMails;
//# sourceMappingURL=sent-pending-mails.js.map