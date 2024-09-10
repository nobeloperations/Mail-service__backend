import cron from 'node-cron';

import sentPendingMails from './jobs/sent-pending-mails';
import closeExpiredIntakes from './jobs/close-expired-intakes';

const startCronJobs = () => {
    cron.schedule('*/5 * * * *', sentPendingMails);
    cron.schedule('0 */12 * * *', closeExpiredIntakes);
};

export default startCronJobs;