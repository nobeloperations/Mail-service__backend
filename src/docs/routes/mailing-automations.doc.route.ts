import j2s from 'joi-to-swagger';

import DocumentHttpErrors from '../http-error-responses/index';
import MailingAutomationsRequestShemas from '../../api/request-schemas/mailing-automations.requst-schemas';

const ROUTE_TAG = 'Mailing automations';

const createResource = {
    tags: [ROUTE_TAG],
    operationId: 'create-mailing-automation',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(MailingAutomationsRequestShemas.createResourse).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Successfully deleted',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'record_id' },
                            name: { type: 'string', example: 'test mailing automatio' },
                            automationScheduledMails: {
                                type: 'array', 
                                example: [
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    }
                                ]
                            }
                        },
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
    operationId: 'update-mailing-automation',
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
                schema: j2s(MailingAutomationsRequestShemas.updateResource).swagger,
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
                            name: { type: 'string', example: 'test mailing automatio' },
                            automationScheduledMails: {
                                type: 'array', 
                                example: [
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    }
                                ]
                            }
                        },
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
    operationId: 'get-mailing-automation',
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
            description: 'Successfully deleted',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'record_id' },
                            name: { type: 'string', example: 'test mailing automatio' },
                            automationScheduledMails: { 
                                type: 'array', 
                                example: [
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'template_name' },
                                                googleDriveFileId: { type: 'string', example: 'google_drive_id' },
                                                createdAt: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                            }
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'template_name' },
                                                googleDriveFileId: { type: 'string', example: 'google_drive_id' },
                                                createdAt: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                            }
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'template_name' },
                                                googleDriveFileId: { type: 'string', example: 'google_drive_id' },
                                                createdAt: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                            }
                                        },
                                    }
                                ] 
                            } 
                        },
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
    operationId: 'delete-mailing-automation',
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
            description: 'Successfully deleted',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'record_id' },
                            name: { type: 'string', example: 'test mailing automatio' },
                            automationScheduledMails: {
                                type: 'array', 
                                example: [
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    }
                                ]
                            }
                        },
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
    operationId: 'get-mailing-automation-list',
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
        {
            name: 'search',
            in: 'path',
            description: 'Filter resources by next fields: name',
            required: false,
            type: 'string',
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
                            name: { type: 'string', example: 'test mailing automatio' },
                            automationScheduledMails: {
                                type: 'array', 
                                example: [
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    }
                                ]
                            }
                        },
                        {
                            id: { type: 'string', example: 'record_id' },
                            name: { type: 'string', example: 'test mailing automatio' },
                            automationScheduledMails: {
                                type: 'array', 
                                example: [
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    },
                                    {
                                        id: { type: 'string', example: 'record_id' },
                                        timeZone: { type: 'string', example: 'Asia/Pekin' },
                                        useContactTimezone: { type: 'boolean', example: true },
                                        scheduledDate: { type: 'date', example: '2024-12-29T22:00:00.000+00:00' },
                                        template: { 
                                            type: 'object', 
                                            example: {
                                                id: { type: 'string', example: 'record_id' },
                                                name: { type: 'string', example: 'eminder EQ' },
                                                googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                                                createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                                            } 
                                        },
                                    }
                                ]
                            }
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

const addContactsToResource = {
    tags: [ROUTE_TAG],
    operationId: 'mailing-automation-add-contacts',
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
                schema: j2s(MailingAutomationsRequestShemas.addContactsToResourse).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful retrieved list of records',
            content: {
                'application/json': {
                    example: [
                        {
                            contactId: 'record_id',
                            mailingAutomationId: 'record_id'
                        },
                        {
                            contactId: 'record_id',
                            mailingAutomationId: 'record_id'
                        },
                    ]
                },
            },
        },
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.notFoundResponse,
        ...DocumentHttpErrors.internalServerError
    },
};


const removeContactsFromResouce = {
    tags: [ROUTE_TAG],
    operationId: 'mailing-automation-remove-contacts',
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
                schema: j2s(MailingAutomationsRequestShemas.removeContactsFromResourse).swagger,
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful retrieved list of records',
            content: {
                'application/json': {
                    example: [
                        {
                            contactId: 'record_id',
                            mailingAutomationId: 'record_id'
                        },
                        {
                            contactId: 'record_id',
                            mailingAutomationId: 'record_id'
                        },
                    ]
                },
            },
        },
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.notFoundResponse,
        ...DocumentHttpErrors.internalServerError
    },
};

const routes = {
    '/api/mailing-automations': {
        post: createResource,
        get: retriveResourceList,
    },
    '/api/mailing-automations/{id}': {
        put: updateResource,
        get: retriveResourceById,
        delete: deleteResourceById,
    },
    '/api/mailing-automations/{id}/add-contacts': {
        post: addContactsToResource,
    },
    '/api/mailing-automations/{id}/remove-contacts': {
        post: removeContactsFromResouce,
    },
};

export default routes;