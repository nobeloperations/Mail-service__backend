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

import ContactFormCreation from './infrustructure/services/contact/contactFormCreation'

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
app.use("/contact-form-creation", ContactFormCreation)
app.use('/action', ContactActionsRouter);


app.use('/test', async (req,res) => {
  res.json({message: "good"})
});

import prismaClient from './database/prisma-client';

app.use('/test-nikita', async (req, res) => {
  const contact = await prismaClient.contact.findMany({
    where: {
      listIds: {
        hasSome: ['65b2cb4d9f9f640b8b5baa64']
      },
    },
    select: {
      id: true
    }
  });

  // const contact = await prismaClient.contact.update({
  //   where: {
  //     email: 'anna.y@nobelcoaching.com',
  //   },
  //   data: {
  //     eduQuestSelectedDateTime: '2024-02-03T14:00:00.000+00:00',
  //     eduQuestEventTimestamp: 'February 03, 2024 16:00 GMT+02:00',
  //     lists: {
  //       connect: { id: '65b2cb4d9f9f640b8b5baa64' }
  //     }
  //   }
  // });
  const arrayofIDs = contact.map(data => data.id);

  res.send({ arrayofIDs })

});

startCronJobs();

app.use(prismaErrorHandler);
app.use(errorHandler);

export default app;