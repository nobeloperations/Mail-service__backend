import prismaClient from '../../../../../database/prisma-client';

const trackReferralLink = async (referralCode: string) => {
    const targetReferralLinkRecord = await prismaClient.referralLink.findUnique({ 
        where: { code: referralCode } 
    });

    if (!targetReferralLinkRecord) return;

    const result = await prismaClient.referralLink.update({
        where: { code: referralCode },
        data: { clickingCount: targetReferralLinkRecord.clickingCount + 1 },
    });

    return result;
};

const getReferralLinksgStats = async () => {
    const databaseResult = await prismaClient.referralLink.findMany();

    const result = databaseResult.reduce((acc, { name, clickingCount}) => {
        acc[name] = clickingCount;
        return acc;
    }, {});

    return result;
};

export default {
    trackReferralLink,
    getReferralLinksgStats
};