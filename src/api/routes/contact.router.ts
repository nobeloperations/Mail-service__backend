import { Router } from 'express';
import authenticate from '../middlewares/authenticate'

import contactController from '../controllers/contactController'
import ExceptionInterceptor from '../middlewares/exception-interceptor.middleware';
import isValidId from '../middlewares/isValidId';

const router=Router();

router.get(
    '/contact',
    authenticate,
    ExceptionInterceptor(contactController.getContactList)
);

router.get(
    '/contact/:id',
    authenticate,
    isValidId,
    ExceptionInterceptor(contactController.getContactById)
);

router.post(
    '/contact',
    authenticate,
    ExceptionInterceptor(contactController.createContact)
);

router.put(
    '/contact/:id',
    authenticate,
    isValidId,
    ExceptionInterceptor(contactController.updateContactById)
);

router.delete(
    '/contact/:id',
    authenticate,
    isValidId,
    ExceptionInterceptor(contactController.deleteContactById)
);

export default router;