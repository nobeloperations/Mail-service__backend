import prismaClient from '../../../../../database/prisma-client';

const trackReferralLink = async (referralCode: string) => {
    const targetReferralLinkRecord = await prismaClient.referralLink.findUnique({ 
        where: { code: referralCode } 
    });

    if (!targetReferralLinkRecord) return;

    const result = await prismaClient.referralLinkClickingStat.create({
        data: { 
            referralLink: {
                connect: { id: targetReferralLinkRecord.id }
            }
        },
    });

    return result;
};

const getReferralLinksgStats = async (from: Date | undefined, to: Date | undefined) => {
    const statsWithReferralLink = await prismaClient.referralLinkClickingStat.groupBy({
        where: {
            createdAt: {
                gte: from,
                lt: to,
            },
        },
        by: ['referralLinkId'],
        _count: {
            _all: true
        }
    });
    
    const statsWithReferralLinkNames = await Promise.all(statsWithReferralLink.map(async (stat) => {
        const referralLink = await prismaClient.referralLink.findUnique({
            where: {
                id: stat.referralLinkId,
            },
            select: {
                name: true,
            }
        });
        return {
            count: stat._count._all,
            refferalLinkName: referralLink.name,
        };
    }));

    return statsWithReferralLinkNames;
};

export default {
    trackReferralLink,
    getReferralLinksgStats
};