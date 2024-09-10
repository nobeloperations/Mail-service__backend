import Router from 'express';

import MailingUnsubscirbeController from '../controllers/mailing-unsubscribe.controller';


const router = Router();

router.get(
    '/:mailId', 
    MailingUnsubscirbeController.unsubscribeContactFromMailing
);

export default router;