
import ContactDataService from '../services/contactData'
import SendedMailsService from '../services/sended-mails'
import ScheduledMailsService from '../services/scheduled-mails.service';

import MailSender from '../../infrustructure/services/mail/mail-sender.service';
import MailComposer from '../../infrustructure/services/mail/mail-composer.service';
import MailTimeCoordinator from '../../infrustructure/services/mail/mail-time-coordinator.service';


const sentPendingMails = async () => {
    const pendingMails = await ScheduledMailsService.retrievePendingMails();

    //TODO: Handle an error if it was not possible to send a mail
    for (const processedSheduledMailData of pendingMails) {
        
        const { contactId, id, templateId, ...scheduledMailData } = processedSheduledMailData;
        const contactData = await ContactDataService.retrieveContactData(contactId);

        if (MailTimeCoordinator.isTimeToSendMail(processedSheduledMailData, contactData)) {
            const composedMail = await MailComposer.composeMail(contactData, templateId);

            await MailSender.sentComposedMail(contactData.email, composedMail);
    
            // await ScheduledMailsService.deletePendingMail(id);
            await SendedMailsService.addSendedMail(processedSheduledMailData);
        }        
    }
};

export default sentPendingMails;