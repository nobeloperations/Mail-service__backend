
import ContactDataService from '../services/contactData'
import SendedMailsService from '../services/sended-mails'
import ScheduledMailsService from '../services/scheduled-mails.service';

import MailSender from '../../infrustructure/services/mail/mail-sender.service';
import MailComposer from '../../infrustructure/services/mail/mail-composer.service';
import MailTimeCoordinator from '../../infrustructure/services/mail/mail-time-coordinator.service';
import modifyEmailTextWithUniqueValues from '../../user-actions-system/helpers/uniqueEmailDecorator';

const MESSAGES_PER_MOMENT = Number(process.env.MESSAGES_PER_MOMENT);

const sentPendingMails = async () => {
    const pendingMails = (await ScheduledMailsService.retrievePendingMails());

    for (let i = 0; i < pendingMails.length; i += MESSAGES_PER_MOMENT) {
        const batchOfPendingMails = pendingMails.slice(i, i + MESSAGES_PER_MOMENT);
        console.log('start batcing sending');

        batchOfPendingMails.forEach(async (processedSheduledMailData) => {
            const { contactId, id, templateId, useContactTimezone, mailingAutomationId,  ...restOfFields } = processedSheduledMailData;
            const contactData = await ContactDataService.retrieveContactData(contactId);

            if (MailTimeCoordinator.isTimeToSendMail(processedSheduledMailData) && contactData.isSubscribed) {
                const composedMail = await MailComposer.composeMail(contactData, templateId);
                const composedIdentifiedMail = modifyEmailTextWithUniqueValues(composedMail, {contactId, emailId: id})

                console.log('send')
                await MailSender.sentComposedMail(contactData.email, composedIdentifiedMail);
        
                await ScheduledMailsService.deletePendingMail(id);
                await SendedMailsService.addSendedMail({emailId: id, contactId, templateId, ...restOfFields});
            }        
        });

        console.log('finish batching sending');
    }
};

export default sentPendingMails;