import { Router } from 'express';

import isValidId from '../middlewares/request-id-validator.middleware';
import validateBody from '../middlewares/request-body-validator';

import contactsSchema from '../request-schemas/contacts.request-schemas';

import ContactController from '../controllers/contacts.controller';


const router = Router();

router.get(
    '/',
    ContactController.getContactList
);

router.put(
    '/',
    validateBody(contactsSchema.bulkUpdatingResouces),
    ContactController.batchUpdatingContacts
);

router.delete(
    '/',
    validateBody(contactsSchema.bulkDeletingResouces),
    ContactController.batchDeletingContacts
);

router.post(
    '/',
    validateBody(contactsSchema.createResourse),
    ContactController.createContact
);

router.get(
    '/:id',
    isValidId,
    ContactController.getContactById
);

router.put(
    '/:id',
    isValidId,
    validateBody(contactsSchema.updateResource),
    ContactController.updateContactById
);

router.delete(
    '/:id',
    isValidId,
    ContactController.deleteContactById
);

export default router;