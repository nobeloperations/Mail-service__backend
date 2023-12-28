import { Router } from 'express';

import isValidId from '../middlewares/request-id-validator.middleware';
import validateBody from '../middlewares/request-body-validator';

import scheduledMailsSchema from '../request-schemas/scheduled-mails';

import ScheduledMailsController from '../controllers/scheduled-mails.controller';


const router = Router();

router.get(
    '/',
    ScheduledMailsController.getMailsList
);

router.post(
    '/',
    validateBody(scheduledMailsSchema.createMailSchema),
    ScheduledMailsController.createMails
);

router.get(
    '/:id',
    isValidId,
    ScheduledMailsController.getMailById
);

router.put(
    '/:id',
    isValidId,
    validateBody(scheduledMailsSchema.updateMailSchema),
    ScheduledMailsController.updateMailById
);

router.delete(
    '/:id', 
    isValidId,
    ScheduledMailsController.deleteMailById
);

export default router;