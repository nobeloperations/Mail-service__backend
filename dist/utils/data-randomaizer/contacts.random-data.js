"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const contacts_service_1 = __importDefault(require("../../api/services/contacts.service"));
const generateRandomContact = async () => {
    return {
        firstName: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        age: faker_1.faker.number.int({ min: 18, max: 60 }),
        city: faker_1.faker.location.city(),
        email: faker_1.faker.internet.email(),
        gender: faker_1.faker.helpers.arrayElement(['male', 'female']),
        country: faker_1.faker.location.country(),
        timezone: faker_1.faker.location.timeZone(),
        occupation: faker_1.faker.person.jobTitle(),
        sourceOfReferral: faker_1.faker.lorem.word(),
        eduQuestDecision: faker_1.faker.helpers.arrayElement(['SELECTE', 'TRY_AGAIN', 'EGLISH_ISSUE', 'WE_MISSED_YOU',]),
        intershipMotivation: faker_1.faker.lorem.word(),
        birthDate: faker_1.faker.date.between({ from: '2023-11-19', to: '2023-12-19' }).toISOString(),
        eduQuestSelectedDateTime: faker_1.faker.date.future().toISOString(),
    };
};
const generateRandomContactsData = async (count) => {
    for (let i = 0; i < count; i++) {
        const contactData = await generateRandomContact();
        const response = await contacts_service_1.default.createContact(contactData);
    }
};
exports.default = generateRandomContactsData;
//# sourceMappingURL=contacts.random-data.js.map