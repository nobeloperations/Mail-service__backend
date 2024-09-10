"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyingInternshipBackupHandler = exports.applyingInternshipHandler = void 0;
const moment_1 = __importDefault(require("moment"));
const country_timezone_1 = __importDefault(require("country-timezone"));
const mail_sender_1 = __importDefault(require("../../mailing-service/mail-sender"));
const contacts_service_1 = __importDefault(require("../../../api/services/contacts.service"));
const location_determination_service_1 = __importDefault(require("../../location-determination-service"));
const prisma_client_1 = __importDefault(require("../../../database/prisma-client"));
const applyingInternshipHandler = async (contactData, contactIpAddress) => {
    try {
        const contactLocation = await location_determination_service_1.default.getContactLocationByIpAddress(contactIpAddress);
        const dataAboutContactFromDatabase = await prisma_client_1.default.contact.findUnique({ where: { email: contactData.email } });
        if (contactLocation && (contactLocation.country === 'Russia' || contactLocation.country === 'Belarus' || contactLocation.country === 'Israel')) {
            const contactRecord = dataAboutContactFromDatabase
                ? await contacts_service_1.default.updateContactById(dataAboutContactFromDatabase.id, { ...contactData, ...contactLocation })
                : await contacts_service_1.default.createContact({ ...contactData, ...contactLocation });
            return await subscribeToBlockedContactsList(contactRecord, 'From country agressor');
        }
        const summerOperationTimezone = generateSummerOperationtimezone({ ...contactData, ...contactLocation });
        const eqTimestampCalculatedValue = generateEqTimestampFieldBasedOnEqSelectedDate({ ...contactData, ...contactLocation });
        contactData.ipAddress = contactIpAddress;
        contactData.operationTimezone = summerOperationTimezone;
        contactData.eduQuestEventTimestamp = eqTimestampCalculatedValue;
        const contactRecord = dataAboutContactFromDatabase
            ? await contacts_service_1.default.updateContactById(dataAboutContactFromDatabase.id, { ...contactData, ...contactLocation })
            : await contacts_service_1.default.createContact({ ...contactData, ...contactLocation });
        const listSubscribtionResult = await subscribeToAppropriateList(contactRecord);
        return listSubscribtionResult;
    }
    catch (error) {
        console.log(error);
    }
};
exports.applyingInternshipHandler = applyingInternshipHandler;
const applyingInternshipBackupHandler = async (contactData) => {
    try {
        const contactTimezone = country_timezone_1.default.getTimezones(contactData.country)[0];
        console.log(contactTimezone);
        const dataAboutContactFromDatabase = await prisma_client_1.default.contact.findUnique({ where: { email: contactData.email } });
        const summerOperationTimezone = generateSummerOperationtimezone({ ...contactData, timezone: contactTimezone });
        const eqTimestampCalculatedValue = generateEqTimestampFieldBasedOnEqSelectedDate({ ...contactData, timezone: contactTimezone });
        contactData.ipAddress = '';
        contactData.timezone = contactTimezone;
        contactData.operationTimezone = summerOperationTimezone;
        contactData.eduQuestEventTimestamp = eqTimestampCalculatedValue;
        const contactRecord = dataAboutContactFromDatabase
            ? await contacts_service_1.default.updateContactById(dataAboutContactFromDatabase.id, { ...contactData, timezone: contactTimezone })
            : await contacts_service_1.default.createContact({ ...contactData });
        const listSubscribtionResult = await subscribeToAppropriateList(contactRecord);
        return listSubscribtionResult;
    }
    catch (error) {
        console.log(error);
    }
};
exports.applyingInternshipBackupHandler = applyingInternshipBackupHandler;
const subscribeToAppropriateList = async (contactData) => {
    try {
        if (contactData.eduQuestSelectedDateTime === null) {
            return await subscribeToFutureList(contactData);
        }
        return await subscribeToEQList(contactData);
    }
    catch (e) {
        console.log(e);
    }
};
const subscribeToEQList = async (contactData) => {
    const subscriptionResult = await prisma_client_1.default.contactstList.update({
        where: { eduQuestStartDate: contactData.eduQuestSelectedDateTime },
        data: {
            contacts: { connect: { id: contactData.id } }
        }
    });
    await mail_sender_1.default.sentMail(contactData, '65ba9d47d3ed1c967f8f7483', { from: 'internships@nobelhub.com', replyTo: 'internships@nobelcoaching.com', subject: 'Application submitted' });
    return subscriptionResult;
};
const subscribeToFutureList = async (contactData) => {
    const subscriptionResult = await prisma_client_1.default.futureEqDatesContactsList.create({
        data: {
            contact: {
                connect: { id: contactData.id }
            },
        }
    });
    return subscriptionResult;
};
const subscribeToBlockedContactsList = async (contactData, blockingReason) => {
    const subscriptionResult = await prisma_client_1.default.blockedContactsList.create({
        data: {
            contact: {
                connect: { id: contactData.id }
            },
            reasonOfBlocking: blockingReason
        }
    });
    // Unsubscribe contact from mailing
    await prisma_client_1.default.contact.update({
        where: { id: contactData.id },
        data: {
            isSubscribed: false
        }
    });
    //sent mail stop war
    return subscriptionResult;
};
const generateEqTimestampFieldBasedOnEqSelectedDate = (contactData) => {
    if (contactData.eduQuestSelectedDateTime === null)
        return '';
    const momentDate = (0, moment_1.default)(contactData.eduQuestSelectedDateTime);
    const formatedDate = momentDate.tz(contactData.timezone).format('MMMM DD, YYYY HH:mm');
    return `${formatedDate} ${contactData.timezone}`;
};
const generateSummerOperationtimezone = (contactData) => {
    try {
        const now = moment_1.default.tz(contactData.timezone);
        const standardOffset = now.clone().subtract(6, 'months').utcOffset();
        const dstOffset = now.clone().add(6, 'months').utcOffset();
        const maxOffset = Math.max(standardOffset, dstOffset);
        const formattedOffset = (0, moment_1.default)().utcOffset(maxOffset).format('Z');
        return `GMT${formattedOffset}`;
    }
    catch (e) {
        console.log(e);
        return '';
    }
};
//# sourceMappingURL=index.js.map