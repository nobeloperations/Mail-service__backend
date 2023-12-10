
import ContactDataService from '../services/contactData'
import SendedMailsService from '../services/sended-mails'
import ScheduledMailsService from '../services/scheduled-mails.service';

import MailSender from '../../infrustructure/services/mail/mail-sender.service';
import MailComposer from '../../infrustructure/services/mail/mail-composer.service';
import MailTimeCoordinator from '../../infrustructure/services/mail/mail-time-coordinator.service';


const sentPendingMails = async () => {
    const pendingMails = await ScheduledMailsService.retrievePendingMails();

    pendingMails.forEach(async (processedSheduledMailData) => {
        
        const { contactId, id, templateId, useContactTimezone, ...restOfFields } = processedSheduledMailData;
        const contactData = await ContactDataService.retrieveContactData(contactId);
        //MailTimeCoordinator.isTimeToSendMail(processedSheduledMailData, contactData) && 
        console.log(pendingMails)
        if (contactData.isSubscribed) {
            const composedMail = await MailComposer.composeMail(contactData, templateId);

            await MailSender.sentComposedMail(contactData.email, composedMail);
    
            // await ScheduledMailsService.deletePendingMail(id);
            await SendedMailsService.addSendedMail({emailId: id, contactId, templateId, ...restOfFields});
        }        
    })
};

export default sentPendingMails;