import moment from 'moment-timezone';
import { ScheduledMail } from '@prisma/client';

const isTimeToSendMail = (scheduledMailData: ScheduledMail) => {
    const { scheduledDate } = scheduledMailData;
    
    return moment.utc().isSameOrAfter(scheduledDate);
}

export default {
    isTimeToSendMail
};