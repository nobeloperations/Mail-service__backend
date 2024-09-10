import Router from 'express';

import CompilerMailingController from './controller';
import compilerMailingDataSchema from './request-schema';

import requestBodyValidator from '../../../api/middlewares/request-body-validator';


const router = Router();

router.post(
    '/set-compiler-mailing', 
    requestBodyValidator(compilerMailingDataSchema),
    CompilerMailingController.setCompilerMailing,
);

export default router;