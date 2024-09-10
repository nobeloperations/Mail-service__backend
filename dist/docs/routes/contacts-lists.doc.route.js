"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_to_swagger_1 = __importDefault(require("joi-to-swagger"));
const index_1 = __importDefault(require("../http-error-responses/index"));
const contacts_lists_request_schemas_1 = __importDefault(require("../../api/request-schemas/contacts-lists.request-schemas"));
const ROUTE_TAG = 'Contacts lists';
const createResource = {
    tags: [ROUTE_TAG],
    operationId: 'create-contacts-lists',
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(contacts_lists_request_schemas_1.default.createResourseSchema).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Record created successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'record_id' },
                            name: { type: 'string', example: 'Internship Weekday: December 20, 2023 at 01:00 AM' },
                            eduQuestStartDate: { type: 'date', example: '2023-12-19T23:00:00' },
                            createdAt: { type: 'date', example: '2023-12-23T15:03:33.974Z' },
                        }
                    }
                },
            },
        },
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.badRequestResponse,
        ...index_1.default.internalServerError
    },
};
const updateResource = {
    tags: [ROUTE_TAG],
    operationId: 'update-contacts-lists',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Targert record id',
            required: true,
            type: 'string',
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(contacts_lists_request_schemas_1.default.updateResourseSchema).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Record updated successfully',
            properties: {
                id: { type: 'string', example: 'record_id' },
                name: { type: 'string', example: 'Internship Weekday: December 20, 2023 at 01:00 AM' },
                eduQuestStartDate: { type: 'date', example: '2023-12-19T23:00:00' },
                createdAt: { type: 'date', example: '2023-12-23T15:03:33.974Z' },
            }
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.notFoundResponse,
        ...index_1.default.internalServerError
    },
};
const retriveResourceById = {
    tags: [ROUTE_TAG],
    operationId: 'get-contacts-lists',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Targert record id',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Record retrived successfully',
            properties: {
                id: { type: 'string', example: 'record_id' },
                name: { type: 'string', example: 'Internship Weekday: December 20, 2023 at 01:00 AM' },
                eduQuestStartDate: { type: 'date', example: '2023-12-19T23:00:00' },
                createdAt: { type: 'date', example: '2023-12-23T15:03:33.974Z' },
            }
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.notFoundResponse,
        ...index_1.default.internalServerError
    },
};
const deleteResourceById = {
    tags: [ROUTE_TAG],
    operationId: 'delete-contacts-lists',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Targert record id',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '204': {
            description: 'Contact deleted successfully!',
            properties: {
                id: { type: 'string', example: 'record_id' },
                name: { type: 'string', example: 'Internship Weekday: December 20, 2023 at 01:00 AM' },
                eduQuestStartDate: { type: 'date', example: '2023-12-19T23:00:00' },
                createdAt: { type: 'date', example: '2023-12-23T15:03:33.974Z' },
            }
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.notFoundResponse,
        ...index_1.default.internalServerError
    },
};
const retriveResourceList = {
    tags: [ROUTE_TAG],
    operationId: 'get-contacts-lists-list',
    responses: {
        '200': {
            description: 'Successful retrieved list of records',
            content: {
                'application/json': {
                    example: [
                        {
                            id: { type: 'string', example: 'record_id' },
                            name: { type: 'string', example: 'Internship Weekday: December 20, 2023 at 01:00 AM' },
                            eduQuestStartDate: { type: 'date', example: '2023-12-19T23:00:00' },
                            createdAt: { type: 'date', example: '2023-12-23T15:03:33.974Z' },
                        },
                        {
                            id: { type: 'string', example: 'record_id' },
                            name: { type: 'string', example: 'Internship Weekday: December 20, 2023 at 01:00 AM' },
                            eduQuestStartDate: { type: 'date', example: '2023-12-19T23:00:00' },
                            createdAt: { type: 'date', example: '2023-12-23T15:03:33.974Z' },
                        },
                    ]
                },
            },
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.internalServerError
    },
};
const routes = {
    '/api/contacts-lists': {
        post: createResource,
        get: retriveResourceList,
    },
    '/api/contacts-lists/:id': {
        put: updateResource,
        get: retriveResourceById,
        delete: deleteResourceById,
    },
};
exports.default = routes;
//# sourceMappingURL=contacts-lists.doc.route.js.map