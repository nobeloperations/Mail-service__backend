import { Router } from 'express';

import ReferralStatsController from '../controllers/referral-stats.controller';

const router = Router();

router.get('/links', ReferralStatsController.getReferralLinksgStats);
router.post('/track-referral-link/:referralCode', ReferralStatsController.trackReferralLink);

export default router;