"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_responses_1 = __importDefault(require("../http-error-responses"));
const retriveUnsubscribedContsctsList = {
    tags: ['ContactActions'],
    parameters: [
        {
            in: 'header',
            name: "Authorization",
            description: "Bearer token",
            required: true,
            type: "string",
        }
    ],
    operationId: 'get-unsubscribed-contacts-list',
    responses: {
        '200': {
            description: 'Unsubscribed contacts retrived successfully!',
            content: {
                'application/json': {
                    example: [
                        {
                            id: { type: 'string', example: 'test-id' },
                            contactId: { type: 'string', example: 'test-id' },
                            activityDescription: { type: 'string', example: "Link 'EQ Website' was clicked from the email 'Test Email'" },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        },
                        {
                            id: { type: 'string', example: 'test-id' },
                            contactId: { type: 'string', example: 'test-id' },
                            activityDescription: { type: 'string', example: "Link 'EQ Website' was clicked from the email 'Test Email'" },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        }
                    ]
                },
            },
        },
        ...http_error_responses_1.default.unauthorizedResponse,
        ...http_error_responses_1.default.internalServerError
    },
};
const unsubscribeContact = {
    tags: ['ContactActions'],
    operationId: 'unsubscribe-contact',
    parameters: [
        {
            name: 'contactId',
            in: 'path',
            description: 'Contact id',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Contact was unsubscribed successfully!',
            content: {
                'text/plain': {
                    schema: {
                        type: 'string',
                        example: 'Unsubscribed success'
                    }
                }
            }
        },
        ...http_error_responses_1.default.badRequestResponse,
        ...http_error_responses_1.default.internalServerError
    },
};
const routes = {
    '/action/unsubscribe/contacts': {
        get: retriveUnsubscribedContsctsList,
    },
    '/action/unsubscribe': {
        put: unsubscribeContact,
    },
};
exports.default = routes;
//# sourceMappingURL=contact-actions.doc.routes.js.map