import Router from 'express';

import isValidId from '../middlewares/isValidId';
import MailingAutomationsController from '../controllers/mailing-automations.controller';


const router = Router();

router.get(
    '/mailing-automations',
    MailingAutomationsController.getMailingAutomationsList
);

router.post(
    '/mailing-automations',
    MailingAutomationsController.createMailingAutomation
);

router.get(
    '/mailing-automations/:id',
    isValidId,
    MailingAutomationsController.getMailingAutomationById
);

router.put(
    '/mailing-automations/:id',
    isValidId,
    MailingAutomationsController.updateMailingAutomationById
);

router.delete(
    '/mailing-automations/:id',
    isValidId,
    MailingAutomationsController.deleteMailingAutomationById
);

router.post(
    '/mailing-automations/:id/add-contacts',
    MailingAutomationsController.addContactsToAutomation
);

router.post(
    '/mailing-automations/:id/remove-contacts',
    MailingAutomationsController.removeContactsFromAutomation
);

export default router;