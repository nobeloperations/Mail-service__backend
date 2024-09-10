"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = require("./config");
const mail_composer_1 = __importDefault(require("./mail-composer"));
const sent_mail_service_1 = __importDefault(require("./services/sent-mail.service"));
const scheduled_mail_service_1 = __importDefault(require("./services/scheduled-mail.service"));
;
const AWS_SES = new aws_sdk_1.default.SES(config_1.SES_CONFIG);
const sentMail = async (contactData, mailTemplateId, options) => {
    const { mailText, mailUniqueIdentifier } = await mail_composer_1.default.composeMail(contactData, mailTemplateId);
    const emailContent = [
        `From: ${options.from}`,
        `To: ${contactData.email}`,
        `Subject: ${options.subject}`,
        `Reply-To: ${options.replyTo}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        ``,
        `${mailText}`
    ].join('\r\n');
    let params = {
        RawMessage: { Data: Buffer.from(emailContent) },
        Destinations: [contactData.email],
        Source: options.from,
    };
    try {
        const response = await AWS_SES.sendRawEmail(params).promise();
        const sentedMail = await sent_mail_service_1.default.createRecord({
            contactId: contactData.id,
            templateId: mailTemplateId,
            emailId: mailUniqueIdentifier
        });
    }
    catch (error) {
        console.error('Failed to send email:', error);
    }
};
const sentScheduledMail = async (scheduledMailData) => {
    const { mailText, unsubscribeLink, mailUniqueIdentifier, } = await mail_composer_1.default.composeMail(scheduledMailData.contact, scheduledMailData.templateId, scheduledMailData.additionalData, scheduledMailData.additionalFlags);
    const emailContent = [
        `From: ${scheduledMailData.mailingProfile.senderMail}`,
        `To: ${scheduledMailData.contact.email}`,
        `Subject: ${scheduledMailData.subject}`,
        `Reply-To: ${scheduledMailData.mailingProfile.replingMail}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        `List-Unsubscribe: <${unsubscribeLink}>, <mailto:${process.env.UNSUBSCRIBE_MAILTO_ADDRESS}>`,
        `List-Unsubscribe-Post: List-Unsubscribe=One-Click`,
        ``,
        `${mailText}`
    ].join('\r\n');
    let params = {
        RawMessage: { Data: Buffer.from(emailContent) },
        Destinations: [scheduledMailData.contact.email],
        Source: scheduledMailData.mailingProfile.senderMail,
    };
    try {
        await AWS_SES.sendRawEmail(params).promise();
        await Promise.all([
            sent_mail_service_1.default.createRecord({
                contactId: scheduledMailData.contact.id,
                templateId: scheduledMailData.templateId,
                emailId: mailUniqueIdentifier
            }),
            scheduled_mail_service_1.default.deleteRecordById(scheduledMailData)
        ]);
    }
    catch (error) {
        console.log(error);
        await scheduled_mail_service_1.default.deleteRecordById(scheduledMailData);
    }
};
exports.default = {
    sentMail,
    sentScheduledMail
};
//# sourceMappingURL=index.js.map