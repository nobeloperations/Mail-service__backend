import { Router } from 'express';

import ContactController from '../controllers/contacts.controller'


const router=Router();

router.get(
    '/contacts',
    ContactController.getContactList
);

router.get(
    '/contacts/:id',
    ContactController.getContactById
);

router.post(
    '/contacts',
    ContactController.createContact
);

router.put(
    '/contacts/:id',
    ContactController.updateContactById
);

router.delete(
    '/contacts/:id',
    ContactController.deleteContactById
);

router.put(
    '/contacts',
    ContactController.batchUpdatingContacts
);

router.delete(
    '/contacts',
    ContactController.batchDeletingContacts
);

export default router;