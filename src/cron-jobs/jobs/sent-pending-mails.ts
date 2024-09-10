import moment from 'moment';
import { ScheduledMail } from '@prisma/client';

import prismaClient from '../../database/prisma-client';
import MailSender from '../../infrustructure/mailing-service/mail-sender';


const MESSAGES_PER_SECOND = Number(process.env.MESSAGES_PER_SECOND);
const INTERVAL_MS = Math.floor(1000 / MESSAGES_PER_SECOND); 

const sendMailChunk = async (chunk) => {
    for (let processedScheduledMailData of chunk) {
        try {
            if (!processedScheduledMailData.contact.isSubscribed) {
                console.log(`Not subscribed: ${processedScheduledMailData.id}`);
                await prismaClient.scheduledMail.delete({ where: { id: processedScheduledMailData.id } });
            } else if (isTimeToSendMail(processedScheduledMailData)) {
                console.log(`Sending mail to: ${processedScheduledMailData.id}`);
                await MailSender.sentScheduledMail(processedScheduledMailData);
            }
        } catch (e) {
            console.log(`Error processing mail ID: ${processedScheduledMailData.id}`, e);
        }
    }
};

const sentPendingMails = async () => {
    let mails = await retrievePendingMails();
    let index = 0;

    const intervalId = setInterval(async () => {
        if (index >= mails.length) {
            clearInterval(intervalId);
            console.log('All mails processed');
            return;
        }

        const chunk = mails.slice(index, index + 5);
        index += 5;

        console.log('processing chunk:', Math.ceil(index / 5));

        await sendMailChunk(chunk);
    }, INTERVAL_MS);
};

const isTimeToSendMail = (scheduledMailData: ScheduledMail) => {
    const { scheduledDate } = scheduledMailData;
    
    return moment.utc().isSameOrAfter(scheduledDate);
};

const retrievePendingMails = async () => {
    const currentDateTimeUTC = moment.utc().toDate();

    const pendingMails = await prismaClient.scheduledMail.findMany({
        where: {
            scheduledDate: {
                lt: currentDateTimeUTC
            }
        },
        include: {
            contact: true,
            mailingProfile: true
        },
    });

    return pendingMails;
};

export default sentPendingMails;