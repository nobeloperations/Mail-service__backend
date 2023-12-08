import { Router } from 'express';
import ScheduledMailsController from '../controllers/scheduled-mails.controller';

const router = Router();

router.get(
    '/scheduled-mails', 
    ScheduledMailsController.getMailsList
);

router.get(
    '/scheduled-mails/:id', 
    ScheduledMailsController.getMailById
);

router.post(
    '/scheduled-mails', 
    ScheduledMailsController.createMails
);

router.put(
    '/scheduled-mails/:id', 
    ScheduledMailsController.updateMailById
);

router.delete(
    '/scheduled-mails/:id', 
    ScheduledMailsController.deleteMailById
);

export default router;