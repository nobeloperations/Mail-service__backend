import { Router } from 'express';

import isValidId from '../middlewares/isValidId';
import validateBody from '../middlewares/validateBody';

import contactsListsSchema from '../request-schemas/contacts-lists';

import ContactsListsController from '../controllers/contacts-lists.controller';


const router = Router();

router.get(
    '/',
    ContactsListsController.getListContactsLists 
);

router.post(
    '/',
    validateBody(contactsListsSchema.createContactsListSchema),
    ContactsListsController.createContactsList 
);

router.put(
    '/:id', 
    isValidId,
    validateBody(contactsListsSchema.updateContactsListSchema),
    ContactsListsController.updateContactListById
);

router.delete(
    '/:id',
    isValidId,
    ContactsListsController.deleteContactsListById 
);

export default router;