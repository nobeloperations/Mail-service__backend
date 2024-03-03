import prismaClient from '../../../../../database/prisma-client';


const getCountriesStats = async () => {
    const uniqueCountries = await prismaClient.contact.findMany({
        select: {
            country: true,
        },
        distinct: ['country'],
    });

    const countriesName = uniqueCountries.map(({ country }) => country);

    return {
        countriesName,
        countriesCount: countriesName.length,
    };
};
  

const getContactsAgeStats = async () => {
    const contacts = await prismaClient.contact.findMany({
        select: {
            age: true,
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

    const ageRanges = {
        '13-17': 17,
        '18-24': 24,
        '25-34': 34,
        '35-44': 44,
        '45-54': 54,
        '55-64': 64,
    };

    contacts.forEach(({ age }) => {
        const ageGroup = Object.keys(ageRanges).find(key => age <= ageRanges[key]) || '65+';
        ageGroups[ageGroup]++;
    });

    const { length: contactsCount } = contacts;

    return { ageGroups, contactsCount };
};

const getReferralResourcesStats = async () => {
    const databaseResult = await prismaClient.contact.groupBy({
        by: ['sourceOfReferral'],
        _count: {
            _all: true,
        },
    });

    const result = databaseResult.reduce((acc, { sourceOfReferral, _count }) => {
        acc[sourceOfReferral] = _count._all;
        return acc;
    }, {});

    return result;
};

export default {
    getCountriesStats,
    getContactsAgeStats,
    getReferralResourcesStats,   
};