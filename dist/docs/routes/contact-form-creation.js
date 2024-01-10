"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_to_swagger_1 = __importDefault(require("joi-to-swagger"));
const index_1 = __importDefault(require("../http-error-responses/index"));
const contacts_request_schemas_1 = __importDefault(require("../../api/request-schemas/contacts.request-schemas"));
const createResource = {
    tags: ['Contact Form Creation'],
    operationId: 'contact-form-creation',
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(contacts_request_schemas_1.default.createResourse).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Contact created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'test-id' },
                            firstName: { type: 'string', example: 'John' },
                            lastName: { type: 'string', example: 'Doe' },
                            age: { type: 'number', example: 25 },
                            city: { type: 'string', example: 'Test City' },
                            email: { type: 'string', example: 'johndoe@example.com' },
                            gender: { type: 'string', example: 'Male' },
                            country: { type: 'string', example: 'United States' },
                            timezone: { type: 'string', example: 'GMT-05:00' },
                            occupation: { type: 'string', example: 'Test Occupation' },
                            sourceOfReferral: { type: 'string', example: 'Social Media' },
                            eduQuestDecision: { type: 'string', example: 'Accepted' },
                            intershipMotivation: { type: 'string', example: 'Test Motivation' },
                            birthDate: { type: 'string', example: '1998-01-01T00:00:00Z' },
                            eduQuestSelectedDateTime: { type: 'string', example: '2023-10-03T14:30:00Z' },
                            eduQuestEventTimestamp: { type: 'string', example: 'July 28, 2024 20:00 GMT+06:00' },
                            isSubscribed: { type: 'boolean', example: true },
                            isEqParticipationConfirmed: { type: 'boolean', example: false },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        }
                    }
                },
            },
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.internalServerError
    },
};
const routes = {
    '/contact-form-creation': {
        post: createResource,
    },
};
exports.default = routes;
//# sourceMappingURL=contact-form-creation.js.map