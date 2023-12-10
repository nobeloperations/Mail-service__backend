import Router from 'express';
import UnsubscribeController from '../controllers/unsubscribe.controller';

const router = Router();

router.get("/unsubscribe", UnsubscribeController.unsubscribe)

export default router