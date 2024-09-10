import moment from 'moment';
import { EduQuestDecision, MailingProfile, PrismaClient } from '@prisma/client';

import eqDecisionTemplatesConfig from './config';
import prismaClient from '../../../database/prisma-client';


type cohortType = 'WE' | 'WD';
type eqEventType = 'MAIN' | 'BACKUP';

interface ContactEqDecision {
    contactId: string;
    isParticipateEqEvent: Boolean;
    eduQuestDecision: EduQuestDecision;
}

interface EqDecisionsData {
    cohortType: cohortType;
    eventType: eqEventType;
    contactsDecisions: ContactEqDecision[];
};

const updateContactsEqDecision = async ({ cohortType, eventType, contactsDecisions }: EqDecisionsData) => {
    const groupedContactIdsByEqDecisions = await getGroupedContactsIdsByEduQuestDecision(contactsDecisions);

    await updateContactsEqParticipation(contactsDecisions);
    const updatingDecisionResult = await updateContactsEqDecisons(groupedContactIdsByEqDecisions);

    return updatingDecisionResult;
};

const processContactsEqDecision = async ({ cohortType, eventType, contactsDecisions }: EqDecisionsData) => {
    const groupedContactIdsByEqDecisions = await getGroupedContactsIdsByEduQuestDecision(contactsDecisions);

    await updateContactsEqParticipation(contactsDecisions);
    const updatingDecisionResult = await updateContactsEqDecisons(groupedContactIdsByEqDecisions);
    const scheduledDesicionMailsResult = await scheduleMailsWithEqDecisions(cohortType, eventType, groupedContactIdsByEqDecisions);

    return scheduledDesicionMailsResult;
};

const scheduleMailsWithEqDecisions = async (cohortType: cohortType, eventType: eqEventType, groupedContactsIdsByEduQuestDecision: Record<string, string[]>) => {
    const scheduledMailsResult = await Promise.all(
        Object.entries(groupedContactsIdsByEduQuestDecision).map(async ([eduQuestDecisionString, contactIds]) => {
            const eduQuestDecision = eduQuestDecisionString as EduQuestDecision;
            
            const targetTemplateId = eqDecisionTemplatesConfig[`${eventType}_${eduQuestDecision}`];

            const recordsToCreate = contactIds.map(contactId => {
                return {
                    contactId: contactId,
                    useContactTimezone: false,
                    templateId: targetTemplateId,
                    scheduledDate: moment.utc().format(),
                    subject: 'Eduquest results',
                    mailingProfileId: cohortType === 'WD' ? '66352e3d0695e98138ae063f' : '66352ecb0695e98138ae0640' 
                };
            });

            await prismaClient.scheduledMail.createMany({ data: recordsToCreate });
        })
    );

    return scheduledMailsResult;
};

const updateContactsEqDecisons = async (groupedContactsIdsByEduQuestDecision: Record<string, string[]>) => {
    const updatingResult = await Promise.all(
        Object.entries(groupedContactsIdsByEduQuestDecision).map(async ([eduQuestDecisionString, contactIds]) => {
            const eduQuestDecision = eduQuestDecisionString as EduQuestDecision;

            await prismaClient.contact.updateMany({
                where: { id: { in: contactIds } },
                data: { eduQuestDecision },
            });
        })
    );

    return updatingResult;
};

const updateContactsEqParticipation = async (data: ContactEqDecision[]) => {
    const groupedContactsIdsByEduquestParticipation = await getGroupedContactsIdsByEduQuestParticipation(data);

    console.log(groupedContactsIdsByEduquestParticipation);

    const updatingResult = await Promise.all(
        Object.entries(groupedContactsIdsByEduquestParticipation).map(async ([isParticipateEqEvent, contactIds]) => {
            const eqParticipation = isParticipateEqEvent === 'true';
            console.log('Updating participation to:', eqParticipation, 'for contacts:', contactIds);
            return await prismaClient.contact.updateMany({
                where: { id: { in: contactIds } },
                data: { isParticipanteEqEvent: eqParticipation },
            });
        })
    );

    console.log(updatingResult);

    return updatingResult;
};

const getGroupedContactsIdsByEduQuestDecision = async (data: ContactEqDecision[]): Promise<Record<string, string[]>> => {
    const result: Record<string, string[]> = {};

    for (const { contactId, eduQuestDecision } of data) {
        if (!result[eduQuestDecision]) {
            result[eduQuestDecision] = [];
        }

        result[eduQuestDecision].push(contactId);
    }

    return result;
};

const getGroupedContactsIdsByEduQuestParticipation = async (data: ContactEqDecision[]): Promise<Record<string, string[]>> => {
    const result: Record<string, string[]> = {};

    for (const { contactId, isParticipateEqEvent } of data) {
        if (!result[(isParticipateEqEvent as unknown as string)]) {
            result[(isParticipateEqEvent as unknown as string)] = [];
        }

        result[(isParticipateEqEvent as unknown as string)].push(contactId);
    }

    return result;
};

export default {
    updateContactsEqDecision,
    processContactsEqDecision
};