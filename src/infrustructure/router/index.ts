import Router, { Request, Response } from 'express';

import PromoMailing from './promo-mailing';
import processContactsEqDecision from './sending-eq-results';
import applyingInternshipHandler from './applying-internship';

import StatisticService from './statistics';


const router = Router();

router.post('/contact-form-creation', async (req: Request, res: Response) => {
    const contactData = req.body;
    const userIpAddress = ((req.headers['x-forwarded-for'] as string) || '').split(',')[0].trim() || req.socket.remoteAddress;

    const result = await applyingInternshipHandler(contactData, userIpAddress);

    res.status(200).send('OK');
});

router.post('/process-contacts-results', async (req: Request, res: Response) => {
    const data = req.body;
    const result = await processContactsEqDecision(data);

    res.status(200).json(result)
});

router.post('/schedule-promo-mail-about-nobel-channels', async (req: Request, res: Response) => {
    const { startDate, endDate } = req.body;
    const result = await PromoMailing.scheduleMailingsAboutNobelChannels(startDate, endDate);

    res.status(200).json(result);
});

router.get('/statistics/unique-countries', async (req: Request, res: Response) => {
    const result = await StatisticService.getCountriesStats();

    res.status(200).json(result);
});

router.get('/statistics/contacts-age', async (req: Request, res: Response) => {
    const result = await StatisticService.getReferralResourcesStats();

    res.status(200).json(result);
});

router.get('/statistics/referral-resources', async (req: Request, res: Response) => {
    const result = await StatisticService.getReferralResourcesStats();

    res.status(200).json(result);
});

export default router;