import Router from 'express';

import isValidId from '../middlewares/isValidId';
import validateBody from '../middlewares/validateBody';

import mailTemplatesSchema from '../request-schemas/mail-templates';

import MailTemplatesController from '../controllers/mail-templates.controller';


const router = Router();

router.get(
    '/',
    MailTemplatesController.getMailTemplatesList
);

router.post(
    '/',
    validateBody(mailTemplatesSchema.createTemplateSchema),
    MailTemplatesController.createMailTemplates
);

router.get(
    '/:id', 
    isValidId,
    MailTemplatesController.getMailTemplateDataById
);

router.delete(
    '/:id',
    isValidId,
    MailTemplatesController.deleteMailTemplateById
);

export default router;