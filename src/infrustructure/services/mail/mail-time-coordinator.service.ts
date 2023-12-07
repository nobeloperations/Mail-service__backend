import moment from 'moment-timezone';
import { Contact, ScheduledMail } from '@prisma/client';

const isTimeToSendMail = (scheduledMailData: ScheduledMail, contactData: Contact) => {
    const { timeZone, scheduledDate, useContactTimezone  } = scheduledMailData; 

    const scheduledUtcDate = useContactTimezone 
        ? moment.utc(scheduledDate).tz(contactData.timezone)
        : moment.utc(scheduledDate).tz(timeZone);

    const currentUtcTime = moment.utc();

    return currentUtcTime.isSameOrAfter(scheduledUtcDate);
}

export default {
    isTimeToSendMail
};