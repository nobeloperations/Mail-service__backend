import Router from 'express';
import authenticate from '../../api/middlewares/authenticate';
import UserActionsController from '../controllers/userActions.controller';
import validateBody from '../../api/middlewares/validateBody';
import isValidId from '../../api/middlewares/isValidId';

const router = Router();

router.get("/:id", authenticate, isValidId, UserActionsController.userActions)

export default router