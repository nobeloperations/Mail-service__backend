import j2s from 'joi-to-swagger';

// import ContactsRequestShemas from '../../api/request-schemas/contacts.request-schemas';

const retriveResourceById = {
    tags: ['ContactActions'],
    operationId: 'get-contact-actions',
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
            description: 'Contact actions retrived successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'test-id' },
                            contactId: { type: 'string', example: 'test-id' },
                            typeOfActivity: { type: 'string', example: 'LINK' },
                            templateId: { type: 'string', example: 'test-id' },
                            activityDescription: { type: 'string', example: "Link 'EQ Website' was clicked from the email 'Test Email'" },
                            createdAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
                        }
                    }
                },
            },
        },
    },
};

const routes = {
    '/action/:id': {
        get: retriveResourceById,
    },
};

export default routes;
