"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const contacts_doc_routes_1 = __importDefault(require("./routes/contacts.doc.routes"));
const scheduled_mails_route_1 = __importDefault(require("./routes/scheduled-mails.route"));
const mail_template_doc_route_1 = __importDefault(require("./routes/mail-template.doc.route"));
const contacts_lists_doc_route_1 = __importDefault(require("./routes/contacts-lists.doc.route"));
const mailing_automations_doc_route_1 = __importDefault(require("./routes/mailing-automations.doc.route"));
const auth_doc_routes_1 = __importDefault(require("./routes/auth.doc.routes"));
const ApiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Nobel Mail service API - Documentation',
    },
    servers: [],
    tags: [
        { name: 'Authorization' },
        { name: 'Contacts' },
        { name: 'Contacts lists' },
        { name: 'Mail templates' },
        { name: 'Scheduled mails' },
        { name: 'Mailing automations' },
        { name: 'ContactActions' },
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
        ...auth_doc_routes_1.default,
        ...contacts_doc_routes_1.default,
        ...scheduled_mails_route_1.default,
        ...mail_template_doc_route_1.default,
        ...contacts_lists_doc_route_1.default,
        ...mailing_automations_doc_route_1.default,
        ...contact_actions_doc_routes_1.default
    },
};
const specs = (0, swagger_jsdoc_1.default)({
    swaggerDefinition: {
        ...ApiDocumentation,
        basePath: '/',
    },
    apis: ['./src/docs/routes/*.ts'],
});
const swaggerSetup = {
    serve: swagger_ui_express_1.default.serve,
    setup: swagger_ui_express_1.default.setup(specs),
    documentation: ApiDocumentation,
};
exports.default = swaggerSetup;
//# sourceMappingURL=index.js.map