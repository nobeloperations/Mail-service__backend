import { Router } from 'express';

import ContactsListsController from '../controllers/contacts-lists.controller';


const router = Router();

router.get(
    '/contacts-lists',
    ContactsListsController.getListContactsLists 
);

router.post(
    '/contacts-lists',
    ContactsListsController.createContactsList 
);

router.put(
    '/contacts-lists/:id', 
    ContactsListsController.updateContactListById
);

router.delete(
    '/contacts-lists/:id',
    ContactsListsController.deleteContactsListById 
);

export default router;