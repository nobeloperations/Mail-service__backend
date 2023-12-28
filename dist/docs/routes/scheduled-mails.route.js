"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_to_swagger_1 = __importDefault(require("joi-to-swagger"));
const index_1 = __importDefault(require("../http-error-responses/index"));
const scheduled_mails_1 = __importDefault(require("../../api/request-schemas/scheduled-mails"));
const ROUTE_TAG = 'Scheduled mails';
const createResource = {
    tags: [ROUTE_TAG],
    operationId: 'create-scheduled-mail',
    requestBody: {
        content: {
            'application/json': {
                schema: (0, joi_to_swagger_1.default)(scheduled_mails_1.default.createMailSchema).swagger,
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
                            timeZone: { type: 'string', example: 'Asia/Pekin' },
                            scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                            useContactTimezone: { type: 'boolean', example: true },
                            contactId: { type: 'string', example: 'contact_record_id' },
                            templateId: { type: 'string', example: 'template_record_id' },
                            mailingAutomationId: { type: 'string', example: 'mailing_automation_record_id' },
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
    operationId: 'update-scheduled-mail',
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
                schema: (0, joi_to_swagger_1.default)(scheduled_mails_1.default.updateMailSchema).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Record updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'record_id' },
                            timeZone: { type: 'string', example: 'Asia/Pekin' },
                            scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                            useContactTimezone: { type: 'boolean', example: true },
                            contactId: { type: 'string', example: 'contact_record_id' },
                            templateId: { type: 'string', example: 'template_record_id' },
                            mailingAutomationId: { type: 'string', example: 'mailing_automation_record_id' },
                        }
                    }
                },
            },
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.notFoundResponse,
        ...index_1.default.internalServerError
    },
};
const retriveResourceById = {
    tags: [ROUTE_TAG],
    operationId: 'get-scheduled-mail',
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
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'record_id' },
                            timeZone: { type: 'string', example: 'Asia/Pekin' },
                            scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                            useContactTimezone: { type: 'boolean', example: true },
                            contactId: { type: 'string', example: 'contact_record_id' },
                            templateId: { type: 'string', example: 'template_record_id' },
                            mailingAutomationId: { type: 'string', example: 'mailing_automation_record_id' },
                        }
                    }
                },
            },
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.notFoundResponse,
        ...index_1.default.internalServerError
    },
};
const deleteResourceById = {
    tags: [ROUTE_TAG],
    operationId: 'delete-scheduled-mail',
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
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'record_id' },
                            timeZone: { type: 'string', example: 'Asia/Pekin' },
                            scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                            useContactTimezone: { type: 'boolean', example: true },
                            contactId: { type: 'string', example: 'contact_record_id' },
                            templateId: { type: 'string', example: 'template_record_id' },
                            mailingAutomationId: { type: 'string', example: 'mailing_automation_record_id' },
                        }
                    }
                },
            },
        },
        ...index_1.default.badRequestResponse,
        ...index_1.default.unauthorizedResponse,
        ...index_1.default.notFoundResponse,
        ...index_1.default.internalServerError
    },
};
const retriveResourceList = {
    tags: [ROUTE_TAG],
    operationId: 'get-scheduled-mail-list',
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
            description: 'Number of received record for one page',
            required: false,
            type: 'number',
        },
    ],
    responses: {
        '200': {
            description: 'Successful retrieved list of records',
            content: {
                'application/json': {
                    example: [
                        {
                            id: { type: 'string', example: 'record_id' },
                            timeZone: { type: 'string', example: 'Asia/Pekin' },
                            scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                            useContactTimezone: { type: 'boolean', example: true },
                            contactId: { type: 'string', example: 'contact_record_id' },
                            templateId: { type: 'string', example: 'template_record_id' },
                            mailingAutomationId: { type: 'string', example: 'mailing_automation_record_id' },
                        },
                        {
                            id: { type: 'string', example: 'record_id' },
                            timeZone: { type: 'string', example: 'Asia/Pekin' },
                            scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                            useContactTimezone: { type: 'boolean', example: true },
                            contactId: { type: 'string', example: 'contact_record_id' },
                            templateId: { type: 'string', example: 'template_record_id' },
                            mailingAutomationId: { type: 'string', example: 'mailing_automation_record_id' },
                        }
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
    '/api/scheduled-mails': {
        post: createResource,
        get: retriveResourceList,
    },
    '/api/scheduled-mails/:id': {
        put: updateResource,
        get: retriveResourceById,
        delete: deleteResourceById,
    },
};
exports.default = routes;
//# sourceMappingURL=scheduled-mails.route.js.map