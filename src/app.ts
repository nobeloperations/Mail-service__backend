import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import startCronJobs from './cron-jobs';

import swaggerSetup from './docs';

const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;

dotenv.config({ path: envFile });

import AuthRouter from './api/routes/auth';
import PublicApiRouter from './api/public-api.router';
import InfrustructureRouter from './infrustructure/router';

import ContactActionsRouter from './user-actions-system/routes/contact-actions.router';

import errorHandler from './api/middlewares/error-handler.middleware';
import prismaErrorHandler from './api/middlewares/prisma-error-handler';

import { MailTrakingRouter } from './infrustructure/mailing-service';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.use('/docs', swaggerSetup.serve, swaggerSetup.setup);

app.use('/api', AuthRouter);
app.use('/api', PublicApiRouter);
app.use('/action', ContactActionsRouter)
app.use(InfrustructureRouter)
// app.use("/contact-form-creation", ContactFormCreation)
app.use('/action', ContactActionsRouter);
app.use('/mail-tracking', MailTrakingRouter);

startCronJobs();

app.use(prismaErrorHandler);
app.use(errorHandler);

export default app;