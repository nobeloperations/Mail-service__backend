import Router from 'express';
import EmailOpenTrackingController from '../controllers/openedEmails.controller'

const router = Router();

router.get("/email-open-tracking", EmailOpenTrackingController.emailOpenTracking)

export default router