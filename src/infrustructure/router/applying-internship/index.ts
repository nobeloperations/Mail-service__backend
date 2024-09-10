import moment from 'moment';
import countryTimezone from 'country-timezone';
import { Prisma, Contact } from '@prisma/client';

import MailSenderService from '../../mailing-service/mail-sender';
import ContacService from '../../../api/services/contacts.service';
import LocationDeterminationService from '../../location-determination-service'

import prismaClient from '../../../database/prisma-client';

export const applyingInternshipHandler = async (contactData: Prisma.ContactCreateInput & { partnerLinkIdentifier: string }, contactIpAddress: string) => {
    try {
        const contactLocation = await LocationDeterminationService.getContactLocationByIpAddress(contactIpAddress);
        const dataAboutContactFromDatabase = await prismaClient.contact.findUnique({ where: { email: contactData.email } });
        const partnerLink = await prismaClient.partnerLink.findUnique({ where: { urlIdentifier: contactData.partnerLinkIdentifier }});
        
        if (contactLocation && (contactLocation.country === 'Russia' || contactLocation.country === 'Belarus' || contactLocation.country === 'Israel')) {
            const contactRecord = dataAboutContactFromDatabase
                ? await ContacService.updateContactById(dataAboutContactFromDatabase.id, {...contactData, ...contactLocation})
                : await ContacService.createContact({...contactData, ...contactLocation});
            
            return await subscribeToBlockedContactsList(contactRecord, 'From country agressor');
        }
        
        const summerOperationTimezone = generateSummerOperationtimezone({...contactData, ...contactLocation});
        const eqTimestampCalculatedValue = generateEqTimestampFieldBasedOnEqSelectedDate({...contactData, ...contactLocation});
        
        contactData.ipAddress = contactIpAddress;
        contactData.operationTimezone = summerOperationTimezone;
        contactData.eduQuestEventTimestamp = eqTimestampCalculatedValue;
        

        if (partnerLink) {
            contactData.partnerLink = { connect: { id: partnerLink.id } };
        }

        const { partnerLinkIdentifier, ...creationContactData } = contactData;

        const contactRecord = dataAboutContactFromDatabase
            ? await ContacService.updateContactById(dataAboutContactFromDatabase.id, {...creationContactData, ...contactLocation})
            : await ContacService.createContact({...creationContactData, ...contactLocation});

        const listSubscribtionResult = await subscribeToAppropriateList(contactRecord);

        return listSubscribtionResult;
    } catch(error) {
        console.log(error) 
    }
};

export const applyingInternshipBackupHandler = async (contactData: Prisma.ContactCreateInput) => {
    try {
        const contactTimezone = countryTimezone.getTimezones(contactData.country)[0];
        console.log(contactTimezone);
        const dataAboutContactFromDatabase = await prismaClient.contact.findUnique({ where: { email: contactData.email } });
        
        
        const summerOperationTimezone = generateSummerOperationtimezone({...contactData, timezone: contactTimezone });
        const eqTimestampCalculatedValue = generateEqTimestampFieldBasedOnEqSelectedDate({ ...contactData, timezone: contactTimezone });
        
        contactData.ipAddress = '';
        contactData.timezone = contactTimezone;
        contactData.operationTimezone = summerOperationTimezone;
        contactData.eduQuestEventTimestamp = eqTimestampCalculatedValue;

        const contactRecord = dataAboutContactFromDatabase
            ? await ContacService.updateContactById(dataAboutContactFromDatabase.id, {...contactData, timezone: contactTimezone })
            : await ContacService.createContact({...contactData });

        const listSubscribtionResult = await subscribeToAppropriateList(contactRecord);

        return listSubscribtionResult;
    } catch(error) {
        console.log(error)
    }
};

const subscribeToAppropriateList = async (contactData: Contact) => {
    try {
        
        if (contactData.eduQuestSelectedDateTime === null) {
            return await subscribeToFutureList(contactData);
        }

        return await subscribeToEQList(contactData);
    } catch (e) {
        console.log(e)
    }
};

const subscribeToEQList = async (contactData: Contact) => {
    const subscriptionResult = await prismaClient.contactstList.update({
        where: { eduQuestStartDate: contactData.eduQuestSelectedDateTime },
        data: {
            contacts: { connect: { id: contactData.id } }
        }
    });

    await MailSenderService.sentMail(contactData, '65ba9d47d3ed1c967f8f7483', { from: 'internships@nobelhub.com', replyTo: 'internships@nobelcoaching.com', subject: 'Application submitted' });

    return subscriptionResult;
};

const subscribeToFutureList = async (contactData: Contact) => {
    const subscriptionResult = await prismaClient.futureEqDatesContactsList.create({
        data: {
            contact: {
                connect: { id: contactData.id }
            },
        }
    });

    return subscriptionResult;
};

const subscribeToBlockedContactsList = async (contactData: Contact, blockingReason: string) => {
    const subscriptionResult = await prismaClient.blockedContactsList.create({
        data: {
            contact: {
                connect: { id: contactData.id }
            },
            reasonOfBlocking: blockingReason
        }
    });
    // Unsubscribe contact from mailing
    await prismaClient.contact.update({ 
        where: { id: contactData.id },
        data: {
            isSubscribed: false
        } 
    });

    //sent mail stop war

    return subscriptionResult;
};

const generateEqTimestampFieldBasedOnEqSelectedDate = (contactData: Prisma.ContactCreateInput) => {
    if (contactData.eduQuestSelectedDateTime === null) return '';

    const momentDate = moment(contactData.eduQuestSelectedDateTime);
    const formatedDate = momentDate.tz(contactData.timezone).format('MMMM DD, YYYY HH:mm');

    return `${formatedDate} ${contactData.timezone}`;
};

const generateSummerOperationtimezone = (contactData: Prisma.ContactCreateInput) => {
    try { 
        const now = moment.tz(contactData.timezone);
      
        const standardOffset = now.clone().subtract(6, 'months').utcOffset();
        const dstOffset = now.clone().add(6, 'months').utcOffset();
      
        const maxOffset = Math.max(standardOffset, dstOffset);
      
        const formattedOffset = moment().utcOffset(maxOffset).format('Z');
        return `GMT${formattedOffset}`;
    } catch(e) {
        console.log(e);
        return '';
    }
};  