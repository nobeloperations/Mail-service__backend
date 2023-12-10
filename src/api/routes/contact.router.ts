import { Router } from 'express';
import authenticate from '../middlewares/authenticate'

import contactController from '../controllers/contactController'
import ExceptionInterceptor from '../middlewares/exception-interceptor.middleware';

const router=Router();

router.get(
    '/contact',
    authenticate,
    ExceptionInterceptor(contactController.getContactList)
);

router.get(
    '/contact/:id',
    authenticate,
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
    ExceptionInterceptor(contactController.updateContactById)
);

router.delete(
    '/contact/:id',
    authenticate,
    ExceptionInterceptor(contactController.deleteContactById)
);

export default router;