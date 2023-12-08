import Router from 'express';

import MailTemplatesController from '../controllers/mail-templates.controller';

const router = Router();

router.get(
    '/mail-templates/:id', 
    MailTemplatesController.getMailTemplateDataById
);

router.get(
    '/mail-templates',
    MailTemplatesController.getMailTemplatesList
);

router.post(
    '/mail-templates', 
    MailTemplatesController.createMailTemplates
);

router.delete(
    '/mail-templates/:id', 
    MailTemplatesController.deleteMailTemplateById
);

export default router;