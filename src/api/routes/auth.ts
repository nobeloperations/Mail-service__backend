import Router from 'express';
import AuthController from '../controllers/auth';
import authenticate from '../middlewares/authenticate'
import validateBody from '../middlewares/validateBody';
import authSchema from '../request-schemas/auth';

const router = Router();

router.post("/auth/register", validateBody(authSchema.registerSchema), AuthController.register)

router.post("/auth/login", validateBody(authSchema.loginSchema), AuthController.login)

router.post("/auth/logout", authenticate, AuthController.logout)

router.get("/auth/current", authenticate, AuthController.current)

export default router

