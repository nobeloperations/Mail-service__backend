const nodemailer = require('nodemailer');
import { Contact, ScheduledMail, MailingProfile } from '@prisma/client';

import MailComposer from './mail-composer';
import SentMailsService from './services/sent-mail.service';

import {
    internshipMailingProfileConfig,
    weekdayEqEventMailingProfileConfig, 
    weekendEqEventMailingProfileConfig
} from './config';

const internshipMailTransporter = nodemailer.createTransport(internshipMailingProfileConfig);
const weekdayEqEventMailingTransporter = nodemailer.createTransport(weekdayEqEventMailingProfileConfig)
const weekendEqEventMailingTransporter = nodemailer.createTransport(weekendEqEventMailingProfileConfig);

interface sentMailOptions {
    subject?: string;
    transporter?: any;
}

const sentMail = async (contactData: Contact, mailTemplateId: string, options?: sentMailOptions) => {
    
    const { mailText, mailUniqueIdentifier } = await MailComposer.composeMail(contactData, mailTemplateId);

    const mailSubject = options?.subject || 'Nobel Eduquest team';
    const targetMailingTransporter = options?.transporter || internshipMailTransporter;

    targetMailingTransporter.sendMail({
        to: contactData.email,
        subject: mailSubject,
        html: mailText
    });

    const sentedMail = await SentMailsService.createRecord({ 
        contactId: contactData.id, 
        templateId: mailTemplateId,
        emailId: mailUniqueIdentifier
    });

    return sentedMail;
};

const sentScheduledMail = async (contactData: Contact, scheduledMailData: ScheduledMail) => {
    if (scheduledMailData.mailingProfile === MailingProfile.WEEKDAY_EQ_MAILING) {
        console.log('work')
        return await sentMail(contactData, scheduledMailData.templateId, { transporter: weekdayEqEventMailingTransporter });
    }
    if (scheduledMailData.mailingProfile === MailingProfile.WEEKEND_EQ_MAILING) {
        return await sentMail(contactData, scheduledMailData.templateId, { transporter: weekendEqEventMailingTransporter });
    }
    
    return await sentMail(contactData, scheduledMailData.templateId);
};

export default {
    sentMail,
    sentScheduledMail
};