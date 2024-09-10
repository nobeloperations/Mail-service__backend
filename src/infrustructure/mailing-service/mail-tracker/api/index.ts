import Router from 'express';

import TrackMailOpeningRouter from './routes/track-mail-opening.route';
import MailingUnsubscribeRouter from './routes/maiing-unsubscriber.router';

const router = Router();

// router.use('/track-mail-opening', TrackMailOpeningRouter);
router.use('/unsubscribe-from-mailing', MailingUnsubscribeRouter);

export default router;