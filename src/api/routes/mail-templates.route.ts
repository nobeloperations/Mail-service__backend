import Router from 'express';

import isValidId from '../middlewares/request-id-validator.middleware';
import validateBody from '../middlewares/request-body-validator';

import MailTemplatesController from '../controllers/mail-templates.controller';


const router = Router();

router.get(
    '/',
    MailTemplatesController.getMailTemplatesList
);

router.post(
    '/',
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