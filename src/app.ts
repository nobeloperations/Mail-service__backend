import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import startCronJobs from './cron-jobs';
import ScheduledMailsRouter from './api/routes/scheduled-mails.router';
import MailTemplatesRouter from './api/routes/mail-templates.route';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.use('/api', MailTemplatesRouter);
app.use('/api', ScheduledMailsRouter);

// startCronJobs();

export default app;