import { Router } from 'express';

import ContactsListsController from '../controllers/contacts-lists.controller';
import authenticate from '../middlewares/authenticate';
import isValidId from '../middlewares/isValidId';
import validateBody from '../middlewares/validateBody';
import contactsListsSchema from '../schemas/contacts-lists'


const router = Router();

router.get(
    '/contacts-lists',
    authenticate,
    ContactsListsController.getListContactsLists 
);

router.post(
    '/contacts-lists',
    authenticate,
    validateBody(contactsListsSchema.createContactsListSchema),
    ContactsListsController.createContactsList 
);

router.put(
    '/contacts-lists/:id', 
    authenticate,
    isValidId,
    validateBody(contactsListsSchema.updateContactsListSchema),
    ContactsListsController.updateContactListById
);

router.delete(
    '/contacts-lists/:id',
    authenticate,
    isValidId,
    ContactsListsController.deleteContactsListById 
);

export default router;