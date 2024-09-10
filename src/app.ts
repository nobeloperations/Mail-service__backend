import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import passportStrategy from './infrustructure/auth/passport';
import passport from 'passport';
import session from 'express-session';

import startCronJobs from './cron-jobs';

import swaggerSetup from './docs';

const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;

dotenv.config({ path: envFile });

import PublicApiRouter from './api/public-api.router';
import InfrustructureRouter from './infrustructure/router';

import ContactActionsRouter from './user-actions-system/routes/contact-actions.router';
import AuthRouter from '../src/api/routes/auth.router';

import errorHandler from './api/middlewares/error-handler.middleware';
import prismaErrorHandler from './api/middlewares/prisma-error-handler';

import { MailTrakingRouter } from './infrustructure/mailing-service';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));


app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

passportStrategy(passport);

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(passport.session());
app.use(passport.initialize());

app.use('/docs', swaggerSetup.serve, swaggerSetup.setup);

// app.use(AuthRouter);
app.use('/api', PublicApiRouter);
app.use('/action', ContactActionsRouter)
app.use(InfrustructureRouter)
// app.use("/contact-form-creation", ContactFormCreation)
app.use('/action', ContactActionsRouter);
app.use('/mail-tracking', MailTrakingRouter);

import prismaClient from './database/prisma-client';
import { ScheduledMail } from '@prisma/client';

// app.get('/myroute', async (req, res) => {
//   // const { contacts } = await prismaClient.contactstList.findUnique({
//   //   where: { id: '65e871a37d12632359d6b1e9' },
//   //   include: {
//   //     contacts: {
//   //       where: {
//   //         country: 'Nigeria'
//   //       },
//   //       select: {
//   //         id: true
//   //       }
//   //     }
//   //   },
//   // });

//   // const scheduledMails = []; 

//   // for (const { id } of contacts) {
//   //   const mail = {
//   //     "subject": "Tech Reminder",
//   //     "scheduledDate": "2021-04-30T09:00:00.000Z",
//   //     "useContactTimezone": false,
//   //     "contactId": id,
//   //     "templateId": "66193ec779d0c554d1d70d3e",
//   //     "mailingProfileId": "660d50feb698a84eba4336bf"
//   //   }

//   //   scheduledMails.push(mail);
//   // }

//   // const result = await prismaClient.scheduledMail.createMany({ data: scheduledMails});

//   const result = await prismaClient.scheduledMail.updateMany({
//     where: {
//       scheduledDate: "2021-04-30T09:00:00.000Z"
//     },
//     data: {
//       mailingProfileId: '660d50feb698a84eba4336bf'
//     }
//   });

//   res.send(result);
// });

// app.get('/myroute', async (req, res) => {
// 	const contactList = await prismaClient.contactstList.findUnique({ where: { id: '65f1cd8bfa8006b1ae1dd5e7' } });

// 	const scheduledMailsObjects = contactList.contactIds.map(contactId => {
// 		return {
// 			subject: "Important Update: Your Transition to the JUNE Weekend Cohort",
// 			scheduledDate: "2021-04-30T09:00:00.000Z",
// 			useContactTimezone: false,
// 			contactId: contactId,
// 			templateId: "663f8283dd47383bf5584284",
// 			mailingProfileId: "660d5996b698a84eba4336c1"

// 		};
// 	});

// 	const creationResult = await prismaClient.scheduledMail.createMany({ data: scheduledMailsObjects });

// 	res.status(200).json(creationResult);
// });

// app.get('/zhuba-buba', async (req, res) => {
//   const targetPeople = await prismaClient.contact.findMany({
//     where: {
//       eduQuestDecision: 'WE_MISSED_YOU',
//       reinvitingDate: {
//         isSet: false
//       }
//     },
//     select: {
//       id: true
//     },
//     take: 1000,
//     orderBy: {
//       createdAt: 'asc'
//     },
//   }); 

//   const scheduledMails = targetPeople.map(data => {
//     return {
//       subject: 'New dates are open !',
//       scheduledDate: new Date(),
//       useContactTimezone: false,
//       contactId: data.id,
//       templateId: '66acdfa40ea7cc5827a3d464',
//       mailingProfileId: '660d5996b698a84eba4336c1',
//     };
//   });

//   console.log(scheduledMails.length);

//   await prismaClient.scheduledMail.createMany({
//     data: scheduledMails
//   });

//   const ids = targetPeople.map(data => data.id);

//   const now = new Date();
//   console.log(now);

//   await prismaClient.contact.updateMany({
//     where: {
//       id: { in: ids }
//     }, 
//     data: {
//       reinvitingDate: now
//     }
//   });

// 	res.status(200).json(scheduledMails.length);
// });


startCronJobs();

app.use(prismaErrorHandler);
app.use(errorHandler);

export default app;