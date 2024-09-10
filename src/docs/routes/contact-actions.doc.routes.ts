import DocumentHttpErrors from '../http-error-responses'

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
        ...DocumentHttpErrors.unauthorizedResponse,
        ...DocumentHttpErrors.internalServerError
    },
};

const unsubscribeContact = {
    tags: ['ContactActions'],
    operationId: 'unsubscribe-contact',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Contact id',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Contact unsubscribed successfully!',
            content: {
                'text/plain': {
                    schema: {
                        type: 'string',
                        example: 'Unsubscribed success'
                    }
                }
            }
        },
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.internalServerError
    },
}

const subscribeContact = {
    tags: ['ContactActions'],
    operationId: 'subscribe-contact',
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Contact id',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '200': {
            description: 'Contact subscribed successfully!',
            content: {
                'text/plain': {
                    schema: {
                        type: 'string',
                        example: 'Subscribed success'
                    }
                }
            }
        },
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.internalServerError
    },
}


const routes = {
    '/action/unsubscribe/contacts': {
        get: retriveUnsubscribedContsctsList,
    },
    '/action/unsubscribe/:id': {
        put: unsubscribeContact,
    },
    '/action/subscribe/:id': {
        put: subscribeContact,
    },
};

export default routes;
