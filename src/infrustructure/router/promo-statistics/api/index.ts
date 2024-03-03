import Router from 'express';

import GeneralStatsRouter from './routes/general-stats.routes';
import InternshipStatsRouter from './routes/internship-stats.routes';

const router = Router();

router.use('/general', GeneralStatsRouter);
router.use('/internship', InternshipStatsRouter);

export default router;