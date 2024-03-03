import prismaClient from '../../../../../database/prisma-client';

const getContactResults = async (intakeId: string) => { 
    const targetContactList = await prismaClient.contactstList.findUnique({ where: { intakeId } }); 

    const databaseResult = await prismaClient.contact.groupBy({
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

const getGlobalDistributionStats = async (intakeId: string) => {
    const targetContactList = await prismaClient.contactstList.findUnique({ where: { intakeId } });    

    const result = await prismaClient.contact.groupBy({
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

export default {
    getContactResults,
    getGlobalDistributionStats
};