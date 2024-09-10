"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const passport_1 = __importDefault(require("./infrustructure/auth/passport"));
const passport_2 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const cron_jobs_1 = __importDefault(require("./cron-jobs"));
const docs_1 = __importDefault(require("./docs"));
const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;
dotenv_1.default.config({ path: envFile });
const public_api_router_1 = __importDefault(require("./api/public-api.router"));
const router_1 = __importDefault(require("./infrustructure/router"));
const contact_actions_router_1 = __importDefault(require("./user-actions-system/routes/contact-actions.router"));
const error_handler_middleware_1 = __importDefault(require("./api/middlewares/error-handler.middleware"));
const prisma_error_handler_1 = __importDefault(require("./api/middlewares/prisma-error-handler"));
const mailing_service_1 = require("./infrustructure/mailing-service");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.use((0, express_fileupload_1.default)({ limits: { fileSize: 50 * 1024 * 1024 } }));
(0, passport_1.default)(passport_2.default);
app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(passport_2.default.session());
app.use(passport_2.default.initialize());
app.use('/docs', docs_1.default.serve, docs_1.default.setup);
// app.use(AuthRouter);
app.use('/api', public_api_router_1.default);
app.use('/action', contact_actions_router_1.default);
app.use(router_1.default);
// app.use("/contact-form-creation", ContactFormCreation)
app.use('/action', contact_actions_router_1.default);
app.use('/mail-tracking', mailing_service_1.MailTrakingRouter);
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
(0, cron_jobs_1.default)();
app.use(prisma_error_handler_1.default);
app.use(error_handler_middleware_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map