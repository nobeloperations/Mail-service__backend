import j2s from 'joi-to-swagger';

import DocumentHttpErrors from '../http-error-responses/index';
import ContactsRequestShemas from '../../api/request-schemas/contacts.request-schemas';


const createResource = {
    tags: ['Contact Form Creation'],
    operationId: 'contact-form-creation',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(ContactsRequestShemas.createResourseFormSubmitionForm).swagger,
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
        ...DocumentHttpErrors.badRequestResponse,
        ...DocumentHttpErrors.internalServerError
    },
};

const routes = {
    '/contact-form-creation': {
        post: createResource,
    },
};

export default routes;