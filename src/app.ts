import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import ScheduledMailsRouter from './api/routes/scheduled-mails.router';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/api', ScheduledMailsRouter);

export default app;