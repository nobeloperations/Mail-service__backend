import j2s from 'joi-to-swagger';

import DocumentHttpErrors from '../http-error-responses/index';
import ScheduledMailsRequestShemas from '../../api/request-schemas/scheduled-mails';

const ROUTE_TAG = 'Scheduled mails';

const createResource = {
    tags: [ROUTE_TAG],
    operationId: 'create-scheduled-mail',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(ScheduledMailsRequestShemas.createMailSchema).swagger,
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
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.internalServerError
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
                schema: j2s(ScheduledMailsRequestShemas.updateMailSchema).swagger,
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
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.notFoundResponse,
        ...DocumentHttpErrors.internalServerError
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
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.notFoundResponse,
        ...DocumentHttpErrors.internalServerError
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
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.notFoundResponse,
        ...DocumentHttpErrors.internalServerError
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
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.unauthorizedResponse, 
        ...DocumentHttpErrors.internalServerError
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

export default routes;