import DocumentHttpErrors from '../http-error-responses/index';

const ROUTE_TAG = 'Mail templates';

const createResource = {
    tags: [ROUTE_TAG],
    operationId: 'create-mail-template',
    requestBody: {
        content: {
            'multipart/form-data': {
                schema: {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            format: 'binary'
                        },
                        name: {
                            type: 'string'
                        },
                    },
                    required: ['file'] 
                }
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
                            message: { type: 'string', example: 'Successfully uploaded' }
                        }
                    }
                }
            }
        }
    },
    ...DocumentHttpErrors.unauthorizedResponse,
    ...DocumentHttpErrors.badRequestResponse,
    ...DocumentHttpErrors.internalServerError
};

const retriveResourceById = {
    tags: [ROUTE_TAG],
    operationId: 'get-mail-template',
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
            description: 'Return a HTML markup of target template',
            content: {
                'text/plain': {
                    schema: {
                        type: 'string',
                        example: `
                            <html>
                                <h1>Some HTML markup of mail template</h1>
                            <html>
                        `
                    }
                }
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
    operationId: 'delete-mail-template',
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
            description: 'Successfully deleted',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'record_id' },
                            name: { type: 'string', example: 'eminder EQ' },
                            googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                            createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
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
    operationId: 'get-mail-template-list',
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
            description: 'Successful retrieved list of contacts',
            content: {
                'application/json': {
                    example: [
                        {
                            id: { type: 'string', example: 'record_id' },
                            name: { type: 'string', example: 'eminder EQ' },
                            googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                            createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
                        },
                        {
                            id: { type: 'string', example: 'record_id' },
                            name: { type: 'string', example: 'Mood riser' },
                            googleDriveFileId: { type: 'string', example: '1IoAMmXq5OGzU58NmSVCv17UfZRD9cuaS' },
                            createdAt: { type: 'date', example: '2023-11-02T22:00:00.000Z' }
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
    '/api/mail-templates': {
        post: createResource,
        get: retriveResourceList,
    },
    '/api/mail-templates/:id': {
        get: retriveResourceById,
        delete: deleteResourceById,
    },
};

export default routes;