import Router from 'express';
import authenticate from '../../api/middlewares/authenticate';
import isValidId from '../../api/middlewares/isValidId';
import ContactActionsController from '../controllers/contact-actions.controller'

const router = Router();

router.get("/email-open-tracking", ContactActionsController.emailOpenTracking)

router.get("/email-link-tracking", ContactActionsController.emailLinkTracking)

router.get("/unsubscribe", ContactActionsController.unsubscribe)

router.get("/unsubscribe/users", authenticate, ContactActionsController.unsubscribedContactsList)

router.get("/unsubscribe/users/:id", authenticate, isValidId, ContactActionsController.unsubscribedContact)

router.get("/:id", authenticate, isValidId, ContactActionsController.contactActions)

export default router