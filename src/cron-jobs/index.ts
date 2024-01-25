import cron from 'node-cron';

import sentPendingMails from './jobs/sent-pending-mails';

const startCronJobs = () => {
    cron.schedule('*/30 * * * * *', sentPendingMails);
};

export default startCronJobs;