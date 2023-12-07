import { Router } from 'express';

import ScheduledMailsController from '../controllers/scheduled-mails.controller';
import ExceptionInterceptor from '../middlewares/exception-interceptor.middleware';

const router = Router();

router.get(
    '/scheduled-mails', 
    ExceptionInterceptor(ScheduledMailsController.getMailsList)
);

router.get(
    '/scheduled-mails/:id', 
    ExceptionInterceptor(ScheduledMailsController.getMailById)
);

router.post(
    '/scheduled-mails', 
    ExceptionInterceptor(ScheduledMailsController.createMails)
);

router.put(
    '/scheduled-mails/:id', 
    ExceptionInterceptor(ScheduledMailsController.updateMailById)
);

router.delete(
    '/scheduled-mails/:id', 
    ExceptionInterceptor(ScheduledMailsController.deleteMailById)
);

export default router;