import Router from 'express';

import MailTemplatesController from '../controllers/mail-templates.controller';
import ExceptionInterceptor from '../middlewares/exception-interceptor.middleware';

const router = Router();

router.get(
    '/mail-templates/:id', 
    ExceptionInterceptor(MailTemplatesController.getMailTemplateDataById)
);

router.get(
    '/mail-templates', 
    ExceptionInterceptor(MailTemplatesController.getMailTemplatesList)
);

router.post(
    '/mail-templates', 
    ExceptionInterceptor(MailTemplatesController.createMailTemplates)
);

router.delete(
    '/mail-templates/:id', 
    ExceptionInterceptor(MailTemplatesController.deleteMailTemplateById)
);

export default router;