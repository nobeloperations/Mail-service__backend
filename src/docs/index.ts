import ContactsRoutes from './routes/contacts.doc.routes';
import ContactActionsRoute from './routes/contact-actions.doc.routes'
import AuthRoute from './routes/auth.doc.routes'

const ApiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Nobel Mail service API - Documentation',
    },
    servers: [],
    tags: [
        { name: 'Authorization'},
        { name: 'Contacts'},
        { name: 'ContactActions'},
    ],
    components: {
        securitySchemes: {
            JWT: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
    },
    security: [
        { JWT: [] },
    ],
    paths: {
        ...AuthRoute,
        ...ContactsRoutes,
        ...ContactActionsRoute,
    }
};

export default ApiDocumentation