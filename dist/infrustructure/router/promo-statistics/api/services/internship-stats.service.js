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
const getContactsAgeStats = async (intakeId) => {
    const { contacts } = await prisma_client_1.default.contactstList.findUnique({
        where: {
            intakeId: intakeId
        },
        include: {
            contacts: {
                select: {
                    age: true,
                    country: true
                }
            }
        },
    });
    const ageGroups = {
        '13-17': 0,
        '18-24': 0,
        '25-34': 0,
        '35-44': 0,
        '45-54': 0,
        '55-64': 0,
        '65+': 0,
    };
    const totalAgeGroups = { ...ageGroups };
    const countriesStats = {};
    contacts.forEach(({ age, country }) => {
        const ageGroup = Object.keys(ageGroups).find(key => age <= parseInt(key.split('-')[1])) || '65+';
        totalAgeGroups[ageGroup]++;
        if (!countriesStats[country]) {
            countriesStats[country] = { ...ageGroups };
        }
        countriesStats[country][ageGroup]++;
    });
    const { length: contactsCount } = contacts;
    return { totalAgeGroups, countriesStats, contactsCount };
};
const getSuccessfulPassedStatsByCountry = async (intakeId) => {
    const result = {};
    const { contacts } = await prisma_client_1.default.contactstList.findUnique({
        where: {
            intakeId: intakeId
        },
        include: {
            contacts: {
                select: {
                    country: true,
                    eduQuestDecision: true,
                    isParticipanteEqEvent: true,
                }
            }
        },
    });
    for (const contactData of contacts) {
        const { country, isParticipanteEqEvent, eduQuestDecision } = contactData;
        if (!result[country]) {
            result[country] = {
                passed: 0,
                applied: 0,
                participate: 0
            };
        }
        result[country].applied += 1;
        result[country].participate += (isParticipanteEqEvent ? 1 : 0);
        result[country].passed += (eduQuestDecision === "SELECTED" ? 1 : 0);
    }
    return result;
};
exports.default = {
    getContactResults,
    getContactsAgeStats,
    getGlobalDistributionStats,
    getSuccessfulPassedStatsByCountry
};
//# sourceMappingURL=internship-stats.service.js.map