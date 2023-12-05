import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import startCronJobs from './cron-jobs';
import ScheduledMailsRouter from './api/routes/scheduled-mails.router';
import sentPendingMails from './cron-jobs/jobs/sent-pending-mails';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/api', ScheduledMailsRouter);

app.get('/test', async (req, res, next) => {
    const result = await sentPendingMails()
    res.json({result})
})

app.get('/tracking', (req, res) => {
    const emailId = req.query.emailId;
    console.log(`Email with ID ${emailId} was opened`);

    const base64Image = 'R0lGODlhAQABAIAAAP///////ywAAAAAAQABAAACAkQBADs=';
    const imgBuffer = Buffer.from(base64Image, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': imgBuffer.length,
    });
    res.end(imgBuffer);
});

startCronJobs();

export default app;