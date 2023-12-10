import { Router } from 'express';
import ScheduledMailsController from '../controllers/scheduled-mails.controller';
import authenticate from '../middlewares/authenticate'

const router = Router();

router.get(
    '/scheduled-mails',
    authenticate,
    ScheduledMailsController.getMailsList
);

router.get(
    '/scheduled-mails/:id',
    authenticate,
    ScheduledMailsController.getMailById
);

router.post(
    '/scheduled-mails',
    authenticate,
    ScheduledMailsController.createMails
);

router.put(
    '/scheduled-mails/:id',
    authenticate,
    ScheduledMailsController.updateMailById
);

router.delete(
    '/scheduled-mails/:id', 
    authenticate,
    ScheduledMailsController.deleteMailById
);

export default router;