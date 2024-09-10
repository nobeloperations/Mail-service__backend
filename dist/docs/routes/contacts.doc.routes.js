"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_to_swagger_1 = __importDefault(require("joi-to-swagger"));
const index_1 = __importDefault(require("../http-error-responses/index"));
const contacts_request_schemas_1 = __importDefault(require("../../api/request-schemas/contacts.request-schemas"));
const createResource = {
    tags: ['Contacts'],
    operationId: 'create-contact',
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
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.internalServerError
    },
};
const updateResource = {
    tags: ['Contacts'],
    operationId: 'update-contact',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Contact id',
            required: true,
            type: 'number',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(contacts_request_schemas_1.default.updateResource).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Contact updated successfully!',
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
                            isSubscribed: { type: 'boolean', example: true },
                            isEqParticipationConfirmed: { type: 'boolean', example: false },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        }
                    }
                },
            },
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.internalServerError
    },
};
const retriveResourceById = {
    tags: ['Contacts'],
    operationId: 'get-contact',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Contact id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Contact retrived successfully!',
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
                            isSubscribed: { type: 'boolean', example: true },
                            isEqParticipationConfirmed: { type: 'boolean', example: false },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        }
                    }
                },
            },
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.internalServerError
    },
};
const deleteResourceById = {
    tags: ['Contacts'],
    operationId: 'delete-contact',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Contact id',
            required: true,
            type: 'number',
        },
    ],
    responses: {
        '204': {
            description: 'Contact deleted successfully!',
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
                            isSubscribed: { type: 'boolean', example: true },
                            isEqParticipationConfirmed: { type: 'boolean', example: false },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        }
                    }
                },
            },
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.internalServerError
    },
};
const retriveResourceList = {
    tags: ['Contacts'],
    operationId: 'get-contact-list',
    parameters: [
        {
            name: 'page',
            in: 'path',
            description: 'Page number',
            required: false,
            type: 'number',
        },
        {
            name: 'pageSize',
            in: 'path',
            description: 'Number of received contacts for one page',
            required: false,
            type: 'number',
        },
        {
            name: 'search',
            in: 'path',
            description: 'Filter contacts by next fields: firstName, lastName, email',
            required: false,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Successful retrieved list of contacts',
            content: {
                'application/json': {
                    example: [
                        {
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
                            isSubscribed: { type: 'boolean', example: true },
                            isEqParticipationConfirmed: { type: 'boolean', example: false },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        },
                        {
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
                            isSubscribed: { type: 'boolean', example: true },
                            isEqParticipationConfirmed: { type: 'boolean', example: false },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        },
                    ]
                },
            },
        },
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.internalServerError
    },
};
const bulkResourceUpdating = {
    tags: ['Contacts'],
    operationId: 'contact-bulk-updating',
    description: 'Update field of many contacts at the same time',
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(contacts_request_schemas_1.default.bulkUpdatingResouces).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulk contacts updating',
            content: {
                'text/plain': {
                    schema: {
                        type: 'string',
                        example: 'OK'
                    }
                }
            }
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.internalServerError
    },
};
const bulkResourceDeleting = {
    tags: ['Contacts'],
    operationId: 'bulkingCreation',
    description: 'Delete many contacts at the same time',
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(contacts_request_schemas_1.default.bulkDeletingResouces).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulk contacts deleting',
            content: {
                'text/plain': {
                    schema: {
                        type: 'string',
                        example: 'OK'
                    }
                }
            }
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.internalServerError
    },
};
const retriveResourceActionsById = {
    tags: ['Contacts'],
    operationId: 'get-contact-actions',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Contact id',
            required: true,
            type: 'number',
        },
        {
            name: 'typeOfActivity',
            in: 'path',
            description: 'Type of activity',
            required: false,
            type: 'string',
        },
        {
            in: 'header',
            name: "Authorization",
            description: "Bearer token",
            required: true,
            type: "string",
        }
    ],
    responses: {
        '200': {
            description: 'Contact actions retrived successfully!',
            content: {
                'application/json': {
                    example: [
                        {
                            id: { type: 'string', example: 'test-id' },
                            contactId: { type: 'string', example: 'test-id' },
                            typeOfActivity: { type: 'string', example: 'LINK' },
                            templateId: { type: 'string', example: 'test-id' },
                            activityDescription: { type: 'string', example: "Link 'EQ Website' was clicked from the email 'Test Email'" },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        },
                        {
                            id: { type: 'string', example: 'test-id' },
                            contactId: { type: 'string', example: 'test-id' },
                            typeOfActivity: { type: 'string', example: 'EMAIL' },
                            templateId: { type: 'string', example: 'test-id' },
                            activityDescription: { type: 'string', example: "Email 'Test Email' was opened" },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        },
                    ]
                },
            },
        },
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.badRequestResponse,
        ...index_1.default.internalServerError
    },
};
const routes = {
    '/api/contacts': {
        post: createResource,
        get: retriveResourceList,
        put: bulkResourceUpdating,
        delete: bulkResourceDeleting
    },
    '/api/contacts/:id': {
        put: updateResource,
        get: retriveResourceById,
        delete: deleteResourceById,
    },
    '/api/contacts/:id/actions': {
        get: retriveResourceActionsById
    },
};
exports.default = routes;
//# sourceMappingURL=contacts.doc.routes.js.map