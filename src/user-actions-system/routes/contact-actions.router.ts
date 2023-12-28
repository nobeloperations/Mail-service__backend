import Router from 'express';
import authenticate from '../../api/middlewares/auth-handler.middleware';
import requestIdValidator from '../../api/middlewares/request-id-validator.middleware';
import ContactActionsController from '../controllers/contact-actions.controller'

const router = Router();

router.get("/email-open-tracking", ContactActionsController.emailOpenTracking)

router.get("/email-link-tracking", ContactActionsController.emailLinkTracking)

router.get("/unsubscribe", ContactActionsController.unsubscribe)

router.get("/unsubscribe/users", authenticate, ContactActionsController.unsubscribedContactsList)

router.get("/unsubscribe/users/:id", authenticate, requestIdValidator, ContactActionsController.unsubscribedContact)

router.get("/:id", authenticate, requestIdValidator, ContactActionsController.contactActions)

export default router