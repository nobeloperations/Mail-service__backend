import { Router } from 'express';
import ScheduledMailsController from '../controllers/scheduled-mails.controller';
import authenticate from '../middlewares/authenticate'
import isValidId from '../middlewares/isValidId';
import validateBody from '../middlewares/validateBody';
import scheduledMailsSchema from '../request-schemas/scheduled-mails';

const router = Router();

router.get(
    '/scheduled-mails',
    authenticate,
    ScheduledMailsController.getMailsList
);

router.get(
    '/scheduled-mails/:id',
    authenticate,
    isValidId,
    ScheduledMailsController.getMailById
);

router.post(
    '/scheduled-mails',
    authenticate,
    validateBody(scheduledMailsSchema.createMailSchema),
    ScheduledMailsController.createMails
);

router.put(
    '/scheduled-mails/:id',
    authenticate,
    isValidId,
    validateBody(scheduledMailsSchema.updateMailSchema),
    ScheduledMailsController.updateMailById
);

router.delete(
    '/scheduled-mails/:id', 
    authenticate,
    isValidId,
    ScheduledMailsController.deleteMailById
);

export default router;