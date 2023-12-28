import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import startCronJobs from './cron-jobs';

import swaggerSetup from './docs';

import AuthRouter from './api/routes/auth';
import PublicApiRouter from './api/public-api.router';

import ContactActionsRouter from './user-actions-system/routes/contact-actions.router';

import errorHandler from './api/middlewares/error-handler.middleware';
import prismaErrorHandler from './api/middlewares/prisma-error-handler';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.use('/docs', swaggerSetup.serve, swaggerSetup.setup);

app.use('/api', AuthRouter);
app.use('/api', PublicApiRouter);
app.use('/action', ContactActionsRouter)

app.use('/test', async (req,res) => {
  startCronJobs()
  
  res.json({message: "good"})
})


app.use(prismaErrorHandler);
app.use(errorHandler);

export default app;