"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
const client_1 = require("@prisma/client");
const mail_composer_1 = __importDefault(require("./mail-composer"));
const sent_mail_service_1 = __importDefault(require("./services/sent-mail.service"));
const config_1 = require("./config");
const internshipMailTransporter = nodemailer.createTransport(config_1.internshipMailingProfileConfig);
const weekdayEqEventMailingTransporter = nodemailer.createTransport(config_1.weekdayEqEventMailingProfileConfig);
const weekendEqEventMailingTransporter = nodemailer.createTransport(config_1.weekendEqEventMailingProfileConfig);
const sentMail = async (contactData, mailTemplateId, options) => {
    const { mailText, mailUniqueIdentifier } = await mail_composer_1.default.composeMail(contactData, mailTemplateId);
    const mailSubject = options?.subject || 'Nobel Eduquest team';
    const targetMailingTransporter = options?.transporter || internshipMailTransporter;
    targetMailingTransporter.sendMail({
        to: contactData.email,
        subject: mailSubject,
        html: mailText
    });
    const sentedMail = await sent_mail_service_1.default.createRecord({
        contactId: contactData.id,
        templateId: mailTemplateId,
        emailId: mailUniqueIdentifier
    });
    return sentedMail;
};
const sentScheduledMail = async (contactData, scheduledMailData) => {
    if (scheduledMailData.mailingProfile === client_1.MailingProfile.WEEKDAY_EQ_MAILING) {
        console.log('work');
        return await sentMail(contactData, scheduledMailData.templateId, { transporter: weekdayEqEventMailingTransporter });
    }
    if (scheduledMailData.mailingProfile === client_1.MailingProfile.WEEKEND_EQ_MAILING) {
        return await sentMail(contactData, scheduledMailData.templateId, { transporter: weekendEqEventMailingTransporter });
    }
    return await sentMail(contactData, scheduledMailData.templateId);
};
exports.default = {
    sentMail,
    sentScheduledMail
};
//# sourceMappingURL=index.js.map