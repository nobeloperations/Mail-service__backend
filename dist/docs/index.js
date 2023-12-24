"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contacts_doc_routes_1 = __importDefault(require("./routes/contacts.doc.routes"));
const contact_actions_doc_routes_1 = __importDefault(require("./routes/contact-actions.doc.routes"));
const ApiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Nobel Mail service API - Documentation',
    },
    servers: [],
    tags: [
        { name: 'Contacts' },
        { name: 'ContactActions' },
    ],
    paths: {
        ...contacts_doc_routes_1.default,
        ...contact_actions_doc_routes_1.default
    }
};
exports.default = ApiDocumentation;
//# sourceMappingURL=index.js.map