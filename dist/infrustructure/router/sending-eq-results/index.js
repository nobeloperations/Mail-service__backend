"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("./config"));
const prisma_client_1 = __importDefault(require("../../../database/prisma-client"));
;
const updateContactsEqDecision = async ({ cohortType, eventType, contactsDecisions }) => {
    const groupedContactIdsByEqDecisions = await getGroupedContactsIdsByEduQuestDecision(contactsDecisions);
    await updateContactsEqParticipation(contactsDecisions);
    const updatingDecisionResult = await updateContactsEqDecisons(groupedContactIdsByEqDecisions);
    return updatingDecisionResult;
};
const processContactsEqDecision = async ({ cohortType, eventType, contactsDecisions }) => {
    const groupedContactIdsByEqDecisions = await getGroupedContactsIdsByEduQuestDecision(contactsDecisions);
    await updateContactsEqParticipation(contactsDecisions);
    const updatingDecisionResult = await updateContactsEqDecisons(groupedContactIdsByEqDecisions);
    const scheduledDesicionMailsResult = await scheduleMailsWithEqDecisions(cohortType, eventType, groupedContactIdsByEqDecisions);
    return scheduledDesicionMailsResult;
};
const scheduleMailsWithEqDecisions = async (cohortType, eventType, groupedContactsIdsByEduQuestDecision) => {
    const scheduledMailsResult = await Promise.all(Object.entries(groupedContactsIdsByEduQuestDecision).map(async ([eduQuestDecisionString, contactIds]) => {
        const eduQuestDecision = eduQuestDecisionString;
        const targetTemplateId = config_1.default[`${eventType}_${eduQuestDecision}`];
        const recordsToCreate = contactIds.map(contactId => {
            return {
                contactId: contactId,
                useContactTimezone: false,
                templateId: targetTemplateId,
                scheduledDate: moment_1.default.utc().format(),
                subject: 'Eduquest results',
                mailingProfileId: cohortType === 'WD' ? '66352e3d0695e98138ae063f' : '66352ecb0695e98138ae0640'
            };
        });
        await prisma_client_1.default.scheduledMail.createMany({ data: recordsToCreate });
    }));
    return scheduledMailsResult;
};
const updateContactsEqDecisons = async (groupedContactsIdsByEduQuestDecision) => {
    const updatingResult = await Promise.all(Object.entries(groupedContactsIdsByEduQuestDecision).map(async ([eduQuestDecisionString, contactIds]) => {
        const eduQuestDecision = eduQuestDecisionString;
        await prisma_client_1.default.contact.updateMany({
            where: { id: { in: contactIds } },
            data: { eduQuestDecision },
        });
    }));
    return updatingResult;
};
const updateContactsEqParticipation = async (data) => {
    const groupedContactsIdsByEduquestParticipation = await getGroupedContactsIdsByEduQuestParticipation(data);
    console.log(groupedContactsIdsByEduquestParticipation);
    const updatingResult = await Promise.all(Object.entries(groupedContactsIdsByEduquestParticipation).map(async ([isParticipateEqEvent, contactIds]) => {
        const eqParticipation = isParticipateEqEvent === 'true';
        console.log('Updating participation to:', eqParticipation, 'for contacts:', contactIds);
        return await prisma_client_1.default.contact.updateMany({
            where: { id: { in: contactIds } },
            data: { isParticipanteEqEvent: eqParticipation },
        });
    }));
    console.log(updatingResult);
    return updatingResult;
};
const getGroupedContactsIdsByEduQuestDecision = async (data) => {
    const result = {};
    for (const { contactId, eduQuestDecision } of data) {
        if (!result[eduQuestDecision]) {
            result[eduQuestDecision] = [];
        }
        result[eduQuestDecision].push(contactId);
    }
    return result;
};
const getGroupedContactsIdsByEduQuestParticipation = async (data) => {
    const result = {};
    for (const { contactId, isParticipateEqEvent } of data) {
        if (!result[isParticipateEqEvent]) {
            result[isParticipateEqEvent] = [];
        }
        result[isParticipateEqEvent].push(contactId);
    }
    return result;
};
exports.default = {
    updateContactsEqDecision,
    processContactsEqDecision
};
//# sourceMappingURL=index.js.map