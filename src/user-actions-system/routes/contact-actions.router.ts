import Router from 'express';
import authenticate from '../../api/middlewares/authenticate';
import isValidId from '../../api/middlewares/isValidId';
import ContactActionsController from '../controllers/contact-actions.controller'

const router = Router();

router.get("/email-open-tracking", ContactActionsController.emailOpenTracking)

router.get("/email-link-tracking", ContactActionsController.emailLinkTracking)

router.put("/unsubscribe", ContactActionsController.unsubscribe)

router.get("/unsubscribe/contacts", authenticate, ContactActionsController.unsubscribedContactsList)

router.get("/unsubscribe/contacts/:id", authenticate, isValidId, ContactActionsController.unsubscribedContact)

export default router