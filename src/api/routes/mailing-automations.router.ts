import Router from 'express';

import isValidId from '../middlewares/isValidId';
import MailingAutomationsController from '../controllers/mailing-automations.controller';


const router = Router();

router.get(
    '/',
    MailingAutomationsController.getMailingAutomationsList
);

router.post(
    '/',
    MailingAutomationsController.createMailingAutomation
);

router.get(
    '/:id',
    isValidId,
    MailingAutomationsController.getMailingAutomationById
);

router.put(
    '/:id',
    isValidId,
    MailingAutomationsController.updateMailingAutomationById
);

router.delete(
    '/:id',
    isValidId,
    MailingAutomationsController.deleteMailingAutomationById
);

router.post(
    '/:id/add-contacts',
    MailingAutomationsController.addContactsToAutomation
);

router.post(
    '/:id/remove-contacts',
    MailingAutomationsController.removeContactsFromAutomation
);

export default router;