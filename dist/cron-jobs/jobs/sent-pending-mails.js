"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const mail_sender_1 = __importDefault(require("../../infrustructure/mailing-service/mail-sender"));
const MESSAGES_PER_SECOND = Number(process.env.MESSAGES_PER_SECOND);
const INTERVAL_MS = Math.floor(1000 / MESSAGES_PER_SECOND);
const sendMailChunk = async (chunk) => {
    for (let processedScheduledMailData of chunk) {
        try {
            if (!processedScheduledMailData.contact.isSubscribed) {
                console.log(`Not subscribed: ${processedScheduledMailData.id}`);
                await prisma_client_1.default.scheduledMail.delete({ where: { id: processedScheduledMailData.id } });
            }
            else if (isTimeToSendMail(processedScheduledMailData)) {
                console.log(`Sending mail to: ${processedScheduledMailData.id}`);
                await mail_sender_1.default.sentScheduledMail(processedScheduledMailData);
            }
        }
        catch (e) {
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
const isTimeToSendMail = (scheduledMailData) => {
    const { scheduledDate } = scheduledMailData;
    return moment_1.default.utc().isSameOrAfter(scheduledDate);
};
const retrievePendingMails = async () => {
    const currentDateTimeUTC = moment_1.default.utc().toDate();
    const pendingMails = await prisma_client_1.default.scheduledMail.findMany({
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
exports.default = sentPendingMails;
//# sourceMappingURL=sent-pending-mails.js.map