import Router from 'express';
import authenticate from '../middlewares/authenticate'

import MailTemplatesController from '../controllers/mail-templates.controller';

const router = Router();

router.get(
    '/mail-templates/:id', 
    authenticate,
    MailTemplatesController.getMailTemplateDataById
);

router.get(
    '/mail-templates',
    authenticate,
    MailTemplatesController.getMailTemplatesList
);

router.post(
    '/mail-templates',
    authenticate,
    MailTemplatesController.createMailTemplates
);

router.delete(
    '/mail-templates/:id',
    authenticate, 
    MailTemplatesController.deleteMailTemplateById
);

export default router;