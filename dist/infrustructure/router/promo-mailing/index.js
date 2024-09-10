"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const client_1 = require("@prisma/client");
const prisma_client_1 = __importDefault(require("../../../database/prisma-client"));
const config_1 = __importDefault(require("./config"));
const scheduleMailingsAboutNobelChannels = async (startDate, endDate) => {
    const targetTemplateId = config_1.default.PROMO_NOBEL_CHANNELS;
    const selectedPeopleFromTargetTimeDiapazone = await prisma_client_1.default.contact.findMany({
        where: {
            eduQuestSelectedDateTime: {
                gte: startDate,
                lte: endDate
            },
            eduQuestDecision: client_1.EduQuestDecision.SELECTED
        }
    });
    const recordsToCreate = selectedPeopleFromTargetTimeDiapazone.map(contact => {
        return {
            contactId: contact.id,
            useContactTimezone: false,
            templateId: targetTemplateId,
            subject: 'Nobel chanels',
            mailingProfileId: '660d5996b698a84eba4336c1',
            scheduledDate: moment_1.default.utc().format(),
        };
    });
    await prisma_client_1.default.scheduledMail.createMany({ data: recordsToCreate });
};
exports.default = {
    scheduleMailingsAboutNobelChannels
};
//# sourceMappingURL=index.js.map