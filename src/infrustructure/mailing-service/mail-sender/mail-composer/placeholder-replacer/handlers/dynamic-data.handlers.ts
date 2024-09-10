import moment from 'moment';
import { Contact, InternShipProgramType } from '@prisma/client';

import prismaClient from '../../../../../../database/prisma-client';


const dynamicPlaceholderHandlers = {
    '%BACKUP_EQ_DATE%': (contactData: Contact) => backupEqDatePlaceholderReplacer(contactData),
    '%INTERNSHIP_SCHEDULE%': (contactData: Contact) => internshipSchedulePlaceholderReplacer(contactData),
    '%ORIENTATION_DAY_DATE%': (contactData: Contact) => orientationDayDatePlaceholderReplacer(contactData), 
    '%FIRST_INTERNSHIP_CLASS_DATE%': (contactData: Contact) => firstInternshipClassDatePlaceholderReplacer(contactData)
};

const orientationDayDatePlaceholderReplacer = async (contactData: Contact) => {
    const { orientationEventDateTime } = await prismaClient.intake.findUnique({ 
        where: {
            eventDate: contactData.eduQuestSelectedDateTime
        } 
    });

    const formatedOrientationDayDate = moment(orientationEventDateTime).tz(contactData.timezone).format('MMMM D, YYYY HH:mm');

    return `${formatedOrientationDayDate}, ${contactData.timezone}`;
};

const firstInternshipClassDatePlaceholderReplacer = async (contactData: Contact) => {
    const { firstInternshipClassDateTime } = await prismaClient.intake.findUnique({ 
        where: {
            eventDate: contactData.eduQuestSelectedDateTime
        } 
    });

    const formatedOrientationDayDate = moment(firstInternshipClassDateTime).tz(contactData.timezone).format('MMMM D, YYYY HH:mm');

    return `${formatedOrientationDayDate}, ${contactData.timezone}`;
};

const internshipSchedulePlaceholderReplacer = async (contactData: Contact) => {
    const contactSelectedIntake = await prismaClient.intake.findUnique({ 
        where: {
            eventDate: contactData.eduQuestSelectedDateTime
        } 
    });

    return contactSelectedIntake.programType === InternShipProgramType.WEEKDAY
        ? 'every Monday, Tuesday, Wednesday, and Friday'
        : 'every Saturday and Sunday'
};

const backupEqDatePlaceholderReplacer = async (contactData: Contact) => {
    const { eduQuestSelectedDateTime } = contactData;

    const momentDate = moment(eduQuestSelectedDateTime);

    const formatedDate = momentDate.add(1, 'days').tz(contactData.timezone).format('MMMM DD, YYYY HH:mm');
 
    return `${formatedDate} ${contactData.timezone}`;
};

export default dynamicPlaceholderHandlers;