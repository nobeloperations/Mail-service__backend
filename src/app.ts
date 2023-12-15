import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import prismaClient from './database/prisma-client'

import startCronJobs from './cron-jobs';

import MailTemplatesRouter from './api/routes/mail-templates.route';
import ScheduledMailsRouter from './api/routes/scheduled-mails.router';
import AuthRouter from './api/routes/auth';
import ContactRouter from './api/routes/contacts.router';

import ContactsListsRouter from './api/routes/contacts-lists.route';

import sentPendingMails from './cron-jobs/jobs/sent-pending-mails';

import errorHandler from './api/middlewares/error-handler.middleware';
import prismaErrorHandler from './api/middlewares/prisma-error-handler';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import swaggerOptions from './docs/swagger-options';

const specs = swaggerJsdoc(swaggerOptions);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use('/api', MailTemplatesRouter);
app.use('/api', ScheduledMailsRouter);

app.use('/api', AuthRouter);
app.use('/api', ContactRouter);
app.use('/api', ContactsListsRouter);

app.get('/test', async (req, res, next) => {
    const result = await sentPendingMails()
    res.json({result})
})

app.get('/tracking', (req, res) => {
    const emailId = req.query.emailId;
    console.log(`Email with ID ${emailId} was opened`);

    prismaClient.sentMail.update({
        where: {
          id: "emailId",
        },
        data: {
          emailStatus: 'OPENED',
        },
      })

    const base64Image = 'R0lGODlhAQABAIAAAP///////ywAAAAAAQABAAACAkQBADs=';
    const imgBuffer = Buffer.from(base64Image, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': imgBuffer.length,
    });
    res.end(imgBuffer);
});

app.use(prismaErrorHandler);
app.use(errorHandler);

// startCronJobs();

export default app;