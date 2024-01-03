import Router from 'express';

import idValidator from '../middlewares/request-id-validator.middleware';

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
    idValidator,
    MailTemplatesController.getMailTemplateDataById
);

router.put(
    '/:id',
    idValidator,
    MailTemplatesController.updateMailTemplateDataById
);

router.delete(
    '/:id',
    idValidator,
    MailTemplatesController.deleteMailTemplateById
);

export default router;