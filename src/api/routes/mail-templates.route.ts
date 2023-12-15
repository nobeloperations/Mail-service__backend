import Router from 'express';
import authenticate from '../middlewares/authenticate'

import MailTemplatesController from '../controllers/mail-templates.controller';
import isValidId from '../middlewares/isValidId';
import mailTemplatesSchema from '../request-schemas/mail-templates'
import validateBody from '../middlewares/validateBody';

const router = Router();

router.get(
    '/mail-templates/:id', 
    authenticate,
    isValidId,
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
    validateBody(mailTemplatesSchema.createTemplateSchema),
    MailTemplatesController.createMailTemplates
);

router.delete(
    '/mail-templates/:id',
    authenticate, 
    isValidId,
    MailTemplatesController.deleteMailTemplateById
);

export default router;