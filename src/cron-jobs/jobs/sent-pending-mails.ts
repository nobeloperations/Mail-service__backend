import moment from 'moment';
import { ScheduledMail } from '@prisma/client';

import ContactDataService from '../services/contactData';
import ScheduledMailsService from '../services/scheduled-mails.service';

import MailSender from '../../infrustructure/mailing-service/mail-sender';


const MESSAGES_PER_MOMENT = Number(process.env.MESSAGES_PER_MOMENT);

const sentPendingMails = async () => {
    const pendingMails = (await ScheduledMailsService.retrievePendingMails()).slice(0, 20);
    console.log(pendingMails);
    for (let i = 0; i < pendingMails.length; i += MESSAGES_PER_MOMENT) {
        const batchOfPendingMails = pendingMails.slice(i, i + MESSAGES_PER_MOMENT);

        batchOfPendingMails.forEach(async (processedSheduledMailData) => {
            const contactData = await ContactDataService.retrieveContactData(processedSheduledMailData.contactId);
            
            if (isTimeToSendMail(processedSheduledMailData) && contactData.isSubscribed) {
                await MailSender.sentScheduledMail(contactData, processedSheduledMailData);
                await ScheduledMailsService.deletePendingMail(processedSheduledMailData.id);
            }
        });

        console.log('finish batching sending');
    }
};

const isTimeToSendMail = (scheduledMailData: ScheduledMail) => {
    const { scheduledDate } = scheduledMailData;
    
    return moment.utc().isSameOrAfter(scheduledDate);
}

export default sentPendingMails;