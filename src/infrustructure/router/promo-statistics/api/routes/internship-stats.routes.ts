import { Router } from 'express';

import InternshipStatsController from '../controllers/internship-stats.controller';

const router = Router();

router.get('/contact-results/:intakeId', InternshipStatsController.getContactResults);
router.get('/global-distribution/:intakeId', InternshipStatsController.getGlobalDistributionStats);

export default router;