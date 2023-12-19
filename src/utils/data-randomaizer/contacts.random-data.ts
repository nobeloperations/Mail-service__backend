import { faker } from '@faker-js/faker';
import ContactsService from '../../api/services/contacts.service';
import { Prisma } from '@prisma/client';

const generateRandomContact = async () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 60 }),
        city: faker.location.city(),
        email: faker.internet.email(),
        gender: faker.helpers.arrayElement(['male', 'female']),
        country: faker.location.country(),
        timezone: faker.location.timeZone(),
        occupation: faker.person.jobTitle(),
        sourceOfReferral: faker.lorem.word(),
        eduQuestDecision: faker.helpers.arrayElement(['Selected', 'Pending', 'English issue', 'We missed you']),
        intershipMotivation: faker.lorem.word(),
        birthDate: faker.date.between({ from: '2023-11-19', to: '2023-12-19' }).toISOString(),
        eduQuestSelectedDateTime: faker.date.future().toISOString(),
    };
};


const generateRandomContactsData = async (count: number) => {
    for (let i = 0; i < count; i++) {
        const contactData = await generateRandomContact() as Prisma.ContactCreateInput;
        const response = await ContactsService.createContact(contactData);
    }
};

export default generateRandomContactsData;



