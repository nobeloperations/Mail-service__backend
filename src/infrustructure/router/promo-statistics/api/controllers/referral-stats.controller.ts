import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ReferralsStatsService from '../services/referrals-stats.service';


const trackReferralLink = async (req: Request, res: Response) => {
    const { referralCode } = req.params;

    const result = await ReferralsStatsService.trackReferralLink(referralCode);

    res.status(StatusCodes.OK).json(result);
};

const getReferralLinksgStats = async (_: Request, res: Response) => {
    const result = await ReferralsStatsService.getReferralLinksgStats();

    res.status(StatusCodes.OK).json(result);
};

export default {
    trackReferralLink,
    getReferralLinksgStats
};