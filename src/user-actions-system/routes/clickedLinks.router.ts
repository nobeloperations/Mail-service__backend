import Router from 'express';
import EmailLinkTrackingController from '../controllers/clickedLinks.controller'

const router = Router();

router.get("/email-link-tracking", EmailLinkTrackingController.emailLinkTracking)

export default router