import Router, { Request, Response } from 'express';

import PromoMailing from './promo-mailing';
import EduquestEventHandler from './sending-eq-results';

import ClassRemindersRouter from './class-reminders';
import CompilerMailigRoute from './compiler-mailing';
import { PromoStatisticRouter } from './promo-statistics';
import { applyingInternshipBackupHandler, applyingInternshipHandler } from './applying-internship';

const router = Router();

router.post('/contact-form-creation', async (req: Request, res: Response) => {
    const contactData = req.body;
    const userIpAddress = ((req.headers['x-forwarded-for'] as string) || '').split(',')[0].trim() || req.socket.remoteAddress;
    
    const result = await applyingInternshipHandler(contactData, userIpAddress);

    res.status(200).send('OK');
});

router.post('/contact-form-creation-backup', async (req: Request, res: Response) => {
    const contactData = req.body;
    const result = await applyingInternshipBackupHandler(contactData);

    res.status(200).send('OK');
});

router.post('/update-contacts-results', async (req: Request, res: Response) => {
    const data = req.body;
    const result = await EduquestEventHandler.updateContactsEqDecision(data);

    res.status(200).json(result)
});

router.post('/process-contacts-results', async (req: Request, res: Response) => {
    const data = req.body;
    const result = await EduquestEventHandler.processContactsEqDecision(data);

    res.status(200).json(result)
});

router.post('/schedule-promo-mail-about-nobel-channels', async (req: Request, res: Response) => {
    const { startDate, endDate } = req.body;
    const result = await PromoMailing.scheduleMailingsAboutNobelChannels(startDate, endDate);

    res.status(200).json(result);
});

router.use('/promo-stats', PromoStatisticRouter);
router.use('/additional-mailing', ClassRemindersRouter);
router.use('/additional-mailing', CompilerMailigRoute);

export default router;