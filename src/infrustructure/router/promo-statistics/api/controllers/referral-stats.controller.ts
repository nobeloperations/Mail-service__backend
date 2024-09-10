import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ReferralsStatsService from '../services/referrals-stats.service';


const trackReferralLink = async (req: Request, res: Response) => {
    const { referralCode } = req.params;

    const result = await ReferralsStatsService.trackReferralLink(referralCode);

    res.status(StatusCodes.OK).json(result);
};

const getReferralLinksgStats = async (req: Request, res: Response) => {
    const from = !isNaN(new Date(req.query.from as string).getTime()) ? new Date(req.query.from as string) : undefined;
    const to = !isNaN(new Date(req.query.to as string).getTime()) ? new Date(req.query.to as string) : undefined;

    console.log(from);

    const result = await ReferralsStatsService.getReferralLinksgStats(from, to);

    res.status(StatusCodes.OK).json(result);
};

export default {
    trackReferralLink,
    getReferralLinksgStats
};