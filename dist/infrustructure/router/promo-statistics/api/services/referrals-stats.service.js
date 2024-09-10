"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../../../../database/prisma-client"));
const trackReferralLink = async (referralCode) => {
    const targetReferralLinkRecord = await prisma_client_1.default.referralLink.findUnique({
        where: { code: referralCode }
    });
    if (!targetReferralLinkRecord)
        return;
    const result = await prisma_client_1.default.referralLinkClickingStat.create({
        data: {
            referralLink: {
                connect: { id: targetReferralLinkRecord.id }
            }
        },
    });
    return result;
};
const getReferralLinksgStats = async (from, to) => {
    const statsWithReferralLink = await prisma_client_1.default.referralLinkClickingStat.groupBy({
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
        const referralLink = await prisma_client_1.default.referralLink.findUnique({
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
exports.default = {
    trackReferralLink,
    getReferralLinksgStats
};
//# sourceMappingURL=referrals-stats.service.js.map