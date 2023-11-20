import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import startCronJobs from './cron-jobs';
import ScheduledMailsRouter from './api/routes/scheduled-mails.router';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/api', ScheduledMailsRouter);

startCronJobs();

export default app;