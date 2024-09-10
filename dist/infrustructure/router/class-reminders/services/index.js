"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const prisma_client_1 = __importDefault(require("../../../../database/prisma-client"));
const classRemindersConfig = {
    class: [
        {
            shiftingUnit: 'hours',
            shiftingNumber: 20,
            emailTemplateId: '663b268b1e8af0b91e7fcdb7',
            emailSubject: 'Your %NEAREST_MEETING_ORDER% class starts tomorrow!',
        },
        {
            shiftingUnit: 'hours',
            shiftingNumber: 1,
            emailTemplateId: '663b26d11e8af0b91e7fcdb8',
            emailSubject: 'Your %NEAREST_MEETING_ORDER% class starts soon!'
        }
    ],
    expo: [
        {
            shiftingUnit: 'days',
            shiftingNumber: 3,
            emailTemplateId: '663b25ea1e8af0b91e7fcdb5',
            emailSubject: 'Welcome to your Expo!'
        },
        {
            shiftingUnit: 'hours',
            shiftingNumber: 20,
            emailTemplateId: '663b25b91e8af0b91e7fcdb4',
            emailSubject: 'Your Expo coming tomorrow!'
        },
        {
            shiftingUnit: 'hours',
            shiftingNumber: 1,
            emailTemplateId: '663b26191e8af0b91e7fcdb6',
            emailSubject: 'Your Expo starts soon!'
        }
    ]
};
const orientationDayMeetConfig = {
    class: [
        {
            shiftingUnit: 'hours',
            shiftingNumber: 20,
            emailTemplateId: '663b29971e8af0b91e7fcdbe',
            emailSubject: 'Orientation Day reminder',
        },
        {
            shiftingUnit: 'hours',
            shiftingNumber: 1,
            emailTemplateId: '663b292c1e8af0b91e7fcdbd',
            emailSubject: 'Orientation Day reminder'
        }
    ],
};
const mentorMeetConfig = {
    class: [
        {
            shiftingUnit: 'hours',
            shiftingNumber: 20,
            emailTemplateId: '663b2b691e8af0b91e7fcdc0',
            emailSubject: 'Metor meet reminder',
        },
        {
            shiftingUnit: 'hours',
            shiftingNumber: 1,
            emailTemplateId: '663b2bb31e8af0b91e7fcdc1',
            emailSubject: 'Mentor meet reminder'
        }
    ],
};
const uniPrepMeetsConfig = {
    class: [
        {
            shiftingUnit: 'hours',
            shiftingNumber: 20,
            emailTemplateId: '663b28481e8af0b91e7fcdba',
            emailSubject: 'Your UniPrep class starts tomorrow!',
        },
        {
            shiftingUnit: 'hours',
            shiftingNumber: 1,
            emailTemplateId: '663b28481e8af0b91e7fcdba',
            emailSubject: 'Your UniPrep class starts soon!'
        }
    ],
    expo: [
        {
            shiftingUnit: 'hours',
            shiftingNumber: 20,
            emailTemplateId: '663b28e41e8af0b91e7fcdbc',
            emailSubject: 'Your Expo coming tomorrow!'
        },
        {
            shiftingUnit: 'hours',
            shiftingNumber: 1,
            emailTemplateId: '663b280d1e8af0b91e7fcdb9',
            emailSubject: 'Your Expo starts soon!'
        }
    ]
};
;
;
;
const setClassReminders = async (data) => {
    const extendedRecipientData = await getExtendedRecipientData(data.recipientsData);
    const targetExternalRecipientData = await filterContactsWithoutScheduledReminders(extendedRecipientData, data.classData.classIdentifier);
    console.log(targetExternalRecipientData);
    let scheduledMailData = [];
    if (data.classData.expoMeetingLink && data.classData.expoDate) {
        const expoScheduledMailObjects = createExpoScheduledMailObjects(targetExternalRecipientData, data);
        scheduledMailData = scheduledMailData.concat(expoScheduledMailObjects);
    }
    const classScheduledMailObjects = createClassScheduledMailObjects(targetExternalRecipientData, data);
    scheduledMailData = scheduledMailData.concat(classScheduledMailObjects);
    console.log(scheduledMailData);
    let creationResult;
    if (scheduledMailData.length > 0) {
        creationResult = await prisma_client_1.default.scheduledMail.createMany({
            data: scheduledMailData
        });
        await createClassRemindersRecords(targetExternalRecipientData, data.classData.classIdentifier);
    }
    return creationResult;
};
const filterContactsWithoutScheduledReminders = async (extendedRecipientData, classIdentifier) => {
    const classRemindersRecorsd = await prisma_client_1.default.classReminders.findMany({
        where: { classIdentifier },
        include: {
            contact: {
                select: {
                    id: true
                }
            }
        }
    });
    const contactsWithReminders = classRemindersRecorsd.map(data => data.contact.id);
    return extendedRecipientData.filter(data => !contactsWithReminders.includes(data.id));
};
const createExpoScheduledMailObjects = (extendedRecipientData, classReminderData) => {
    let result = [];
    const tartgetSchedulingConfig = getTargetSchedulingConfig(classReminderData.classData.classIdentifier);
    for (const remindersOption of tartgetSchedulingConfig.expo) {
        const currentDate = new Date();
        const expoDates = classReminderData.classData.expoDate || [];
        for (const expoDate of expoDates) {
            const scheduledDate = moment_1.default.utc(expoDate).subtract(remindersOption.shiftingNumber, remindersOption.shiftingUnit).toISOString();
            const emailSubject = remindersOption.emailSubject;
            if (currentDate > new Date(scheduledDate))
                continue;
            const shceduledMailObjects = extendedRecipientData.map(recipient => {
                const localScheduledDate = (0, moment_1.default)(expoDate).tz(recipient.timezone).format("h:mm a");
                return {
                    subject: emailSubject,
                    scheduledDate: new Date(scheduledDate),
                    useContactTimezone: false,
                    contactId: recipient.id,
                    templateId: remindersOption.emailTemplateId,
                    mailingProfileId: '664e152dc8e2a6e31fb48ae8',
                    additionalData: {
                        '%MEETING_DATE%': `${(0, moment_1.default)(expoDate).format("MMMM Do")}`,
                        '%MEETING_DATE_LOCAL_TIME%': `${localScheduledDate}, ${recipient.timezone}`,
                        '%COURSE_NAME%': classReminderData.classData.courseName,
                        '%MEETING_LINK%': classReminderData.classData.expoMeetingLink,
                        '%EXPLORER_ID%': recipient.explorerId,
                        '%PASSWORD%': recipient.password,
                        '%COURSE_IDENTIFIER%': classReminderData.classData.classIdentifier
                    }
                };
            });
            result.push(...shceduledMailObjects);
        }
    }
    return result;
};
const createClassScheduledMailObjects = (extendedRecipientData, classReminderData) => {
    let result = [];
    const tartgetSchedulingConfig = getTargetSchedulingConfig(classReminderData.classData.classIdentifier);
    for (const remindersOption of tartgetSchedulingConfig.class) {
        for (const [index, meetingDate] of classReminderData.classData.meetingDates.entries()) {
            const currentDate = new Date();
            const scheduledDate = moment_1.default.utc(meetingDate).subtract(remindersOption.shiftingNumber, remindersOption.shiftingUnit).toISOString();
            const emailSubject = remindersOption.emailSubject.replace('%NEAREST_MEETING_ORDER%', replaceNumberWithOrdinal(index + 1));
            if (currentDate > new Date(scheduledDate))
                continue;
            const shceduledMailObjects = extendedRecipientData.map(recipient => {
                const localScheduledDate = (0, moment_1.default)(meetingDate).tz(recipient.timezone).format("h:mm a");
                return {
                    subject: emailSubject,
                    scheduledDate: new Date(scheduledDate),
                    useContactTimezone: false,
                    contactId: recipient.id,
                    templateId: remindersOption.emailTemplateId,
                    mailingProfileId: '664e152dc8e2a6e31fb48ae8',
                    additionalData: {
                        '%MEETING_DATE%': `${(0, moment_1.default)(meetingDate).format("MMMM Do")}`,
                        '%MEETING_DATE_LOCAL_TIME%': `${localScheduledDate}, ${recipient.timezone}`,
                        '%COURSE_NAME%': classReminderData.classData.courseName,
                        '%MEETING_LINK%': classReminderData.classData.classMeetingLink,
                        '%EXPLORER_ID%': recipient.explorerId,
                        '%PASSWORD%': recipient.password,
                        '%COURSE_IDENTIFIER%': classReminderData.classData.classIdentifier
                    }
                };
            });
            result.push(...shceduledMailObjects);
        }
    }
    return result;
};
const getExtendedRecipientData = async (recipientsData) => {
    const recipeintEmails = recipientsData.map(data => data.email);
    const databaseResult = await prisma_client_1.default.contact.findMany({
        where: {
            email: {
                in: recipeintEmails
            }
        },
        select: {
            id: true,
            email: true,
            timezone: true
        }
    });
    const extendedRecipientsData = recipientsData.map(data => {
        const matchingContact = databaseResult.find(contact => contact.email === data.email);
        return {
            ...data,
            id: matchingContact ? matchingContact.id : null,
            timezone: matchingContact ? matchingContact.timezone : null,
        };
    });
    return extendedRecipientsData;
};
const createClassRemindersRecords = async (extendedRecipientData, classIdentifier) => {
    const classReminderData = extendedRecipientData.map(data => {
        return {
            classIdentifier,
            contactId: data.id
        };
    });
    await prisma_client_1.default.classReminders.createMany({
        data: classReminderData
    });
};
const getTargetSchedulingConfig = (classIdentifier) => {
    const configMap = {
        'UNI': uniPrepMeetsConfig,
        'ORD': orientationDayMeetConfig,
        'MTM': mentorMeetConfig
    };
    const defaultConfig = classRemindersConfig;
    const config = Object.keys(configMap).find(code => classIdentifier.includes(code));
    return config ? configMap[config] : defaultConfig;
};
const replaceNumberWithOrdinal = (number) => {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return number + "th";
    }
    switch (lastDigit) {
        case 1:
            return number + "st";
        case 2:
            return number + "nd";
        case 3:
            return number + "rd";
        default:
            return number + "th";
    }
};
const deleteClassRemindersByCourseIdentifier = async (courseIdentifier) => {
    const command = {
        delete: "ScheduledMail",
        deletes: [
            {
                q: {
                    "additionalData.%COURSE_IDENTIFIER%": `${courseIdentifier}`
                },
                limit: 0
            }
        ]
    };
    const result = await prisma_client_1.default.$runCommandRaw(command);
    await prisma_client_1.default.classReminders.deleteMany({
        where: {
            classIdentifier: courseIdentifier
        }
    });
    return result;
};
exports.default = {
    setClassReminders,
    deleteClassRemindersByCourseIdentifier
};
//# sourceMappingURL=index.js.map