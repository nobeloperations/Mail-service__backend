import j2s from 'joi-to-swagger';

import DocumentHttpErrors from '../http-error-responses/index';
import ContactsListsRequestShemas from '../../api/request-schemas/contacts-lists.request-schemas';

const ROUTE_TAG = 'Contacts lists';

const createResource = {
    tags: [ROUTE_TAG],
    operationId: 'create-contacts-lists',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(ContactsListsRequestShemas.createResourseSchema).swagger,
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
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.internalServerError
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
                schema: j2s(ContactsListsRequestShemas.updateResourseSchema).swagger,
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
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.notFoundResponse,
        ...DocumentHttpErrors.internalServerError
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
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.notFoundResponse,
        ...DocumentHttpErrors.internalServerError
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
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.notFoundResponse,
        ...DocumentHttpErrors.internalServerError
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
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.unauthorizedResponse, 
        ...DocumentHttpErrors.internalServerError
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

export default routes;