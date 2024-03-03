import { Router } from 'express';

import GeneralStatsController from '../controllers/general-stats.controller';


const router = Router();

router.get('/countries', GeneralStatsController.getCountriesStats);
router.get('/contacts-age', GeneralStatsController.getContactsAgeStats);
router.get('/referral-resources', GeneralStatsController.getReferralResourcesStats);

export default router;