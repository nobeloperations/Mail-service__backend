
import ContactDataService from '../services/contactData'
import SendedMailsService from '../services/sended-mails'
import ScheduledMailsService from '../services/scheduled-mails.service';

import MailSender from '../../infrustructure/services/mail/mail-sender.service';
import MailComposer from '../../infrustructure/services/mail/mail-composer.service';
import MailTimeCoordinator from '../../infrustructure/services/mail/mail-time-coordinator.service';
import modifyEmailTextWithUniqueValues from '../../user-actions-system/helpers/uniqueEmailDecorator';


const sentPendingMails = async () => {
    const pendingMails = await ScheduledMailsService.retrievePendingMails();

    pendingMails.forEach(async (processedSheduledMailData) => {
        
        const { contactId, id, templateId, useContactTimezone, ...restOfFields } = processedSheduledMailData;
        const contactData = await ContactDataService.retrieveContactData(contactId);
        //MailTimeCoordinator.isTimeToSendMail(processedSheduledMailData, contactData) && 
        if (contactData.isSubscribed) {
            const composedMail = await MailComposer.composeMail(contactData, templateId);
            const composedIdentifiedMail = modifyEmailTextWithUniqueValues(composedMail, {contactId, emailId: id})

            await MailSender.sentComposedMail(contactData.email, composedIdentifiedMail);
    
            // await ScheduledMailsService.deletePendingMail(id);
            await SendedMailsService.addSendedMail({emailId: id, contactId, templateId, ...restOfFields});
        }        
    })
};

export default sentPendingMails;