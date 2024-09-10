import AWS from 'aws-sdk';
import { Contact, ScheduledMail } from '@prisma/client';

import { SES_CONFIG } from './config';
import MailComposer from './mail-composer';
import SentMailsService from './services/sent-mail.service';
import ScheduledMailService from './services/scheduled-mail.service';

interface mailOptions {
    from: string;
    replyTo: string;
    subject: string;
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sentMail = async (contactData: Contact, mailTemplateId: string, options: mailOptions) => {
    
    const { mailText, mailUniqueIdentifier } = await MailComposer.composeMail(contactData, mailTemplateId);

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
        
        const sentedMail = await SentMailsService.createRecord({ 
            contactId: contactData.id, 
            templateId: mailTemplateId,
            emailId: mailUniqueIdentifier
        });
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

const sentScheduledMail = async (scheduledMailData: any) => {  
    const { 
        mailText,
        unsubscribeLink, 
        mailUniqueIdentifier, 
    } = await MailComposer.composeMail(scheduledMailData.contact, scheduledMailData.templateId, scheduledMailData.additionalData, scheduledMailData.additionalFlags); 
    
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
            SentMailsService.createRecord({ 
                contactId: scheduledMailData.contact.id, 
                templateId: scheduledMailData.templateId,
                emailId: mailUniqueIdentifier
            }),
            ScheduledMailService.deleteRecordById(scheduledMailData)
        ]);
    } catch (error) {
        console.log(error);
        await ScheduledMailService.deleteRecordById(scheduledMailData);
    }
};

export default {
    sentMail,
    sentScheduledMail
};