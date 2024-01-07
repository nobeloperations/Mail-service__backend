import { Router } from 'express';
import { getLocation } from '../controllers/contactLocation.controller';

const router = Router();

router.get('/location', getLocation);

export default router;