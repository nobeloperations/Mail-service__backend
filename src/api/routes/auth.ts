import Router from 'express';
import AuthController from '../controllers/auth';
import authenticate from '../middlewares/auth-handler.middleware';
import requestBodyValidator from '../middlewares/request-body-validator';
import authSchema from '../request-schemas/auth';

const router = Router();

router.post("/auth/register", requestBodyValidator(authSchema.registerSchema), AuthController.register)

router.post("/auth/login", requestBodyValidator(authSchema.loginSchema), AuthController.login)

router.post("/auth/logout", authenticate, AuthController.logout)

router.get("/auth/current", authenticate, AuthController.current)

export default router




