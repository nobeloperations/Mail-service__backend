import { Router } from 'express';

import contactController from '../controllers/contactController'
import ExceptionInterceptor from '../middlewares/exception-interceptor.middleware';

const router=Router();

router.get(
    '/contact',
    ExceptionInterceptor(contactController.getContactList)
);
router.get(
    '/contact/:id',
    ExceptionInterceptor(contactController.getContactById)

);
router.post(
    '/contact',
    ExceptionInterceptor(contactController.createContact)

);
router.put(
    '/contact/:id',
    ExceptionInterceptor(contactController.updateContactById)

);
router.delete(
    '/contact/:id',
    ExceptionInterceptor(contactController.deleteContactById)

);
export default router;