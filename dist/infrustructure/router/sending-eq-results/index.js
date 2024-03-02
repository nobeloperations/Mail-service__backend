"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("./config"));
const prisma_client_1 = __importDefault(require("../../../database/prisma-client"));
;
const processContactsEqDecision = async ({ eventType, contactsDecisions }) => {
    const groupedContactIdsByEqDecisions = await getGroupedContactsIdsByEduQuestDecision(contactsDecisions);
    const updatingDecisionResult = await updateContactsEqDecisons(groupedContactIdsByEqDecisions);
    const scheduledDesicionMailsResult = await scheduleMailsWithEqDecisions(eventType, groupedContactIdsByEqDecisions);
    // const unsubscribtionSelectedContactsResult = await unsibscibeSelectedContactsFromMailing()
    return scheduledDesicionMailsResult;
};
const scheduleMailsWithEqDecisions = async (eventType, groupedContactsIdsByEduQuestDecision) => {
    const scheduledMailsResult = await Promise.all(Object.entries(groupedContactsIdsByEduQuestDecision).map(async ([eduQuestDecisionString, contactIds]) => {
        const eduQuestDecision = eduQuestDecisionString;
        const targetTemplateId = config_1.default[`${eventType}_${eduQuestDecision}`];
        const recordsToCreate = contactIds.map(contactId => {
            return {
                contactId: contactId,
                useContactTimezone: false,
                templateId: targetTemplateId,
                scheduledDate: moment_1.default.utc().format(),
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
const unsibscibeSelectedContactsFromMailing = async (groupedContactsIdsByEduQuestDecision) => {
    const targetContactsids = groupedContactsIdsByEduQuestDecision[client_1.EduQuestDecision.SELECTED];
    const updatingResults = await prisma_client_1.default.contact.updateMany({
        where: {
            id: { in: targetContactsids }
        },
        data: {
            isSubscribed: false
        }
    });
    return updatingResults;
};
const getGroupedContactsIdsByEduQuestDecision = async (data) => {
    const result = {};
    for (const { contactId, eduQuestDecision } of data) {
        if (!result[eduQuestDecision]) {
            result[eduQuestDecision] = [];
        }
        result[eduQuestDecision].push(contactId);
    }
    console.log(result);
    return result;
};
exports.default = processContactsEqDecision;
//# sourceMappingURL=index.js.map