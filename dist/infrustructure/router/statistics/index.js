"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../../database/prisma-client"));
const getUniqueCountries = async () => {
    const uniqueContriesContactsRecords = await prisma_client_1.default.contact.findMany({
        select: {
            country: true,
        },
        distinct: ['country'],
    });
    const countriesName = uniqueContriesContactsRecords.map(entry => entry.country);
    return {
        countriesName,
        countriesCount: countriesName.length
    };
};
const getGeneralStatisctsAboutParticipantsAge = async () => {
    const contacts = await prisma_client_1.default.contact.findMany({
        select: {
            age: true
        }
    });
    const ageGroups = {
        '13-17': 0,
        '18-24': 0,
        '25-34': 0,
        '35-44': 0,
        '45-54': 0,
        '55-64': 0,
        '65+': 0
    };
    contacts.forEach(contact => {
        if (contact.age <= 17) {
            ageGroups['13-17']++;
        }
        else if (contact.age >= 18 && contact.age <= 24) {
            ageGroups['18-24']++;
        }
        else if (contact.age >= 25 && contact.age <= 34) {
            ageGroups['25-34']++;
        }
        else if (contact.age >= 35 && contact.age <= 44) {
            ageGroups['35-44']++;
        }
        else if (contact.age >= 45 && contact.age <= 54) {
            ageGroups['45-54']++;
        }
        else if (contact.age >= 55 && contact.age <= 64) {
            ageGroups['55-64']++;
        }
        else if (contact.age >= 65) {
            ageGroups['65+']++;
        }
    });
    return {
        ageGroups,
        contactsCount: contacts.length
    };
};
exports.default = {
    getUniqueCountries,
    getGeneralStatisctsAboutParticipantsAge
};
//# sourceMappingURL=index.js.map