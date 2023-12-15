import dotenv from 'dotenv';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import startCronJobs from './cron-jobs';

import MailTemplatesRouter from './api/routes/mail-templates.route';
import ScheduledMailsRouter from './api/routes/scheduled-mails.router';
import AuthRouter from './api/routes/auth';
import ContactRouter from "./api/routes/contact.router";
import UnsubscribeRouter from './user-actions-system/routes/unsubscribe.router'
import EmailOpenTrackingRouter from './user-actions-system/routes/openedEmails.router'
import EmailLinkTrackingRouter from './user-actions-system/routes/clickedLinks.router'
import UserActionsRouter from './user-actions-system/routes/userActions.router'

import sentPendingMails from './cron-jobs/jobs/sent-pending-mails';

import errorHandler from './api/middlewares/error-handler.middleware';
import prismaErrorHandler from './api/middlewares/prisma-error-handler';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.use('/api', MailTemplatesRouter);
app.use('/api', ScheduledMailsRouter);

app.use('/api', AuthRouter);
app.use('/api', ContactRouter);

app.use('/action', EmailOpenTrackingRouter)
app.use('/action', EmailLinkTrackingRouter)
app.use('/action', UnsubscribeRouter)
app.use('/action', UserActionsRouter)


app.get('/test', async (req, res, next) => {
    const result = await sentPendingMails()
    res.json({result})
})

app.use(prismaErrorHandler);
// app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });

app.use((err, req: Request, res: Response, next: NextFunction) => {
    const { status = 500 } = err;
    res.status(status).json({ message: err.message });
  });

startCronJobs();

export default app;