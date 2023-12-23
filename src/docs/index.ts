import ContactsRoutes from './routes/contacts.doc.routes';
import ContactActionsRoute from './routes/contact-actions.doc.routes'

const ApiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Nobel Mail service API - Documentation',
    },
    servers: [],
    tags: [
        { name: 'Contacts'},
        { name: 'ContactActions'},
    ],
    paths: {
        ...ContactsRoutes,
        ...ContactActionsRoute
    }
};

export default ApiDocumentation