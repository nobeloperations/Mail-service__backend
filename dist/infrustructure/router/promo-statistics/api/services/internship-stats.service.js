"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../../../../database/prisma-client"));
const getContactResults = async (intakeId) => {
    const targetContactList = await prisma_client_1.default.contactstList.findUnique({ where: { intakeId } });
    const databaseResult = await prisma_client_1.default.contact.groupBy({
        where: {
            listIds: {
                has: targetContactList.id
            }
        },
        by: ['eduQuestDecision'],
        _count: {
            _all: true,
        },
    });
    const result = databaseResult.reduce((acc, { eduQuestDecision, _count }) => {
        acc[eduQuestDecision] = _count._all;
        return acc;
    }, {});
    return result;
};
const getGlobalDistributionStats = async (intakeId) => {
    const targetContactList = await prisma_client_1.default.contactstList.findUnique({ where: { intakeId } });
    const result = await prisma_client_1.default.contact.groupBy({
        by: ['country', 'sourceOfReferral'],
        where: {
            listIds: { has: targetContactList.id }
        },
        _count: {
            _all: true
        }
    });
    const transformedResult = result.reduce((acc, curr) => {
        const countryName = curr.country;
        const sourceName = curr.sourceOfReferral;
        const countOfInterns = curr._count._all;
        if (!acc[countryName]) {
            acc[countryName] = {
                referalSources: {},
                internsCount: 0
            };
        }
        acc[countryName].referalSources[sourceName] = countOfInterns;
        acc[countryName].internsCount += countOfInterns;
        return acc;
    }, {});
    return transformedResult;
};
exports.default = {
    getContactResults,
    getGlobalDistributionStats
};
//# sourceMappingURL=internship-stats.service.js.map