import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import ContactsRoutes from './routes/contacts.doc.routes';
import ScheduledMailsRoutes from './routes/scheduled-mails.route';
import MailTemplatesRoutes from './routes/mail-template.doc.route';
import ContactsListsRoutes from './routes/contacts-lists.doc.route';
import MailingAutomationsRoutes from './routes/mailing-automations.doc.route';

const ApiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Nobel Mail service API - Documentation',
    },
    servers: [],
    tags: [
        { name: 'Contacts'},
        { name: 'Contacts lists' },
        { name: 'Mail templates' },
        { name: 'Scheduled mails' },
        { name: 'Mailing automations' }
    ],
    paths: {
        ...ContactsRoutes,
        ...ScheduledMailsRoutes,
        ...MailTemplatesRoutes,
        ...ContactsListsRoutes,
        ...MailingAutomationsRoutes
    },
};

const specs = swaggerJsdoc({
    swaggerDefinition: {
        ...ApiDocumentation,
        basePath: '/',
    },
    apis: ['./src/docs/routes/*.ts'],
});

const swaggerSetup = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(specs),
    documentation: ApiDocumentation,
};

export default swaggerSetup;