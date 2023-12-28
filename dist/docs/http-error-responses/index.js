"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const badRequestResponse = {
    '400': {
        description: 'The server cannot process the client`s request due to malformed or invalid parameters',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        error: {
                            code: 400,
                            name: 'Bad Request',
                            message: 'The request could not be processed due to invalid or missing parameters',
                            description: '__detailed error description___'
                        }
                    }
                }
            }
        }
    },
};
const unauthorizedResponse = {
    '401': {
        description: 'The client`s request lacks valid authentication credentials or has insufficient privileges',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        error: {
                            code: 401,
                            name: 'Unauthorized',
                            message: 'Please provide valid credentials',
                        }
                    }
                }
            }
        }
    },
};
const forbidenResponse = {
    '403': {
        description: 'The server understands the request, but the client does not have permission to access the requested resource',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        error: {
                            code: 403,
                            name: 'Not Found',
                            message: 'You do not have permission to access the requested resource',
                        }
                    }
                }
            }
        }
    },
};
const notFoundResponse = {
    '404': {
        description: 'The requested resource could not be found on the server',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        error: {
                            code: 404,
                            name: 'Not Found',
                            message: 'The requested resource could not be found',
                            description: '__detailed error description___'
                        }
                    }
                }
            }
        }
    },
};
const conflictResponse = {
    '409': {
        description: 'The server cannot complete the request due to a conflict with the current state of the target resource',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        error: {
                            code: 409,
                            name: 'Conflict',
                            message: 'The request could not be completed due to a conflict with the current state of the resource',
                            description: '__detailed error description___'
                        }
                    }
                }
            }
        }
    },
};
const internalServerError = {
    '500': {
        description: 'An unexpected error occurred on the server, and the request could not be completed',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    example: {
                        errror: {
                            code: 500,
                            name: 'Internal Server Error',
                            message: 'An unexpected error occurred on the server',
                        }
                    }
                }
            }
        }
    },
};
exports.default = {
    conflictResponse,
    notFoundResponse,
    forbidenResponse,
    badRequestResponse,
    internalServerError,
    unauthorizedResponse,
};
//# sourceMappingURL=index.js.map