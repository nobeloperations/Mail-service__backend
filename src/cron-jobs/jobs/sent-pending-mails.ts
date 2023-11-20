import ScheduledMailsService from '../services/scheduled-mails.service';

const sentPendingMails = async () => {
    const pendingMails = await ScheduledMailsService.retrievePendingMails();
    // TODO: handle process of sending mails
}; 

export default sentPendingMails;