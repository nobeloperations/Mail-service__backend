import moment from 'moment';
import { EduQuestDecision } from '@prisma/client';
import prismaClient from '../../../database/prisma-client';

import promoTemplatesConfig from './config';


const scheduleMailingsAboutNobelChannels = async (startDate: Date, endDate: Date) => {
    const targetTemplateId = promoTemplatesConfig.PROMO_NOBEL_CHANNELS;

    const selectedPeopleFromTargetTimeDiapazone = await prismaClient.contact.findMany({
        where: {
            eduQuestSelectedDateTime: {
                gte: startDate, 
                lte: endDate
            }, 
            eduQuestDecision: EduQuestDecision.SELECTED
        }
    });

    
    const recordsToCreate = selectedPeopleFromTargetTimeDiapazone.map(contact => {
        return {
            contactId: contact.id,
            useContactTimezone: false,
            templateId: targetTemplateId,
            scheduledDate: moment.utc().format(),
        };
    });

    await prismaClient.scheduledMail.createMany({ data: recordsToCreate });
};

export default { 
    scheduleMailingsAboutNobelChannels
};

