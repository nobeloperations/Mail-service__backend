import { Router } from 'express';

import ContactController from '../controllers/contacts.controller'
import authenticate from '../middlewares/authenticate';
import isValidId from '../middlewares/isValidId';
import validateBody from '../middlewares/validateBody';
import contactsSchema from '../request-schemas/contacts.request-schemas'


const router=Router();

router.get(
    '/contacts',
    authenticate,
    ContactController.getContactList
);

router.get(
    '/contacts/:id',
    authenticate,
    isValidId,
    ContactController.getContactById
);

router.post(
    '/contacts',
    authenticate,
    validateBody(contactsSchema.createResourse),
    ContactController.createContact
);

router.put(
    '/contacts/:id',
    authenticate,
    isValidId,
    validateBody(contactsSchema.updateResource),
    ContactController.updateContactById
);

router.delete(
    '/contacts/:id',
    authenticate,
    isValidId,
    ContactController.deleteContactById
);

router.put(
    '/contacts',
    authenticate,
    validateBody(contactsSchema.bulkUpdatingResouces),
    ContactController.batchUpdatingContacts
);

router.delete(
    '/contacts',
    authenticate,
    validateBody(contactsSchema.bulkDeletingResouces),
    ContactController.batchDeletingContacts
);

export default router;