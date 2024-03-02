import Router from 'express';

import TrackMailOpeningController from '../controllers/track-mail-opening.controller';


const router = Router();

router.get(
    '/:mailId', 
    TrackMailOpeningController.trackMailOpening
);

export default router;