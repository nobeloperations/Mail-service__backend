import Router from 'express';
import authenticate from '../../api/middlewares/authenticate';
import UserActionsController from '../controllers/userActions.controller';

const router = Router();

router.get("/:id", UserActionsController.userActions)

export default router