import { Router } from 'express';

import GeneralStatsController from '../controllers/general-stats.controller';


const router = Router();

router.get('/years', GeneralStatsController.getYearsStats);
router.get('/countries', GeneralStatsController.getCountriesStats);
router.get('/contacts-age', GeneralStatsController.getContactsAgeStats);
router.get('/referral-resources', GeneralStatsController.getReferralResourcesStats);
router.get('/contacts-countries', GeneralStatsController.getContactsNumberGroupedByCountry);

export default router;