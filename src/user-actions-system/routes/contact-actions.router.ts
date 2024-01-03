import Router from 'express';
import authenticate from '../../api/middlewares/auth-handler.middleware';
import requestIdValidator from '../../api/middlewares/request-id-validator.middleware';
import ContactActionsController from '../controllers/contact-actions.controller'

const router = Router();

router.get("/email-open-tracking", ContactActionsController.emailOpenTracking)

router.get("/email-link-tracking", ContactActionsController.emailLinkTracking)

router.put("/unsubscribe/:id", requestIdValidator, ContactActionsController.unsubscribe)

router.get("/unsubscribe/contacts", authenticate, ContactActionsController.unsubscribedContactsList)

router.put("/subscribe/:id", authenticate, requestIdValidator, ContactActionsController.subscribe)

export default router