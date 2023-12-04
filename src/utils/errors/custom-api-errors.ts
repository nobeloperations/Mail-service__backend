import { StatusCodes, ReasonPhrases } from 'http-status-codes';

enum DefaultErrorsDescription {
    NOT_FOUND = 'The requested resource could not be found on the server', 
    BAD_REQUEST = 'The server cannot process the request due to a client error, such as malformed syntax or invalid request parameters',
    UNAUTHORIZED = 'The client lacks proper authentication credentials for the requested resource',
    FORBIDDEN = 'The client does not have permission to access the requested resource',
    INTERNAL_SERVER_ERROR = 'The server encountered an unexpected condition that prevented it from fulfilling the request. This is a server-side error, and the issue is not due to the client`s actions'
}

class BaseApiError extends Error {
    public readonly httpCode: number;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: number, description: string, isOperational: boolean) {
      super(description);
      this.name = name;
      this.httpCode = httpCode;
      this.isOperational = isOperational;
      Error.captureStackTrace(this);
    }

    private static createError(name: string, statusCode: number, description: string, operational: boolean): BaseApiError {
        return new BaseApiError(name, statusCode, description, operational);
    }

    static NotFound(description = DefaultErrorsDescription.NOT_FOUND as string){
        return this.createError(
            ReasonPhrases.NOT_FOUND, 
            StatusCodes.NOT_FOUND, 
            description, 
            true
        );
    }

    static BadRequest(description: string = DefaultErrorsDescription.BAD_REQUEST) {
        return this.createError(
            ReasonPhrases.BAD_REQUEST, 
            StatusCodes.BAD_REQUEST, 
            description, 
            true
        );
    }

    static Unauthorized(description: string = DefaultErrorsDescription.UNAUTHORIZED) {
        return this.createError(
            ReasonPhrases.UNAUTHORIZED, 
            StatusCodes.UNAUTHORIZED, 
            description, 
            true
        );
    }

    static Forbidden(description: string = DefaultErrorsDescription.FORBIDDEN) {
        return this.createError(
            ReasonPhrases.FORBIDDEN, 
            StatusCodes.FORBIDDEN, 
            description, 
            true
        );
    }

    static InternalServerError(description: string = DefaultErrorsDescription.INTERNAL_SERVER_ERROR) {
        return this.createError(
            ReasonPhrases.INTERNAL_SERVER_ERROR, 
            StatusCodes.INTERNAL_SERVER_ERROR, 
            description, 
            false
        );
    }
}

export default BaseApiError;