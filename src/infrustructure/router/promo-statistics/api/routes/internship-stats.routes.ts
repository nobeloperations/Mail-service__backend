import { Router } from 'express';

import InternshipStatsController from '../controllers/internship-stats.controller';

const router = Router();

router.get('/contacts-age/:intakeId', InternshipStatsController.getContactsAgeStats);
router.get('/contact-results/:intakeId', InternshipStatsController.getContactResults);
router.get('/global-distribution/:intakeId', InternshipStatsController.getGlobalDistributionStats);
router.get('/show-up-distribution/:intakeId', InternshipStatsController.getSuccessfulPassedStatsByCountry);


export default router;