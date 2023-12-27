import { StatusCodes, ReasonPhrases } from 'http-status-codes';

enum DefaultHttpErrorsMessages {
    UNAUTHORIZED = 'Please provide valid credentials',
    NOT_FOUND = 'The requested resource could not be found', 
    INTERNAL_SERVER_ERROR = 'An unexpected error occurred on the server',
    FORBIDDEN = 'You do not have permission to access the requested resource',
    BAD_REQUEST = 'The request could not be processed due to invalid or missing parameters',
    CONFLICT = 'The request could not be completed due to a conflict with the current state of the resource',
}

class HttpError extends Error {
    public readonly message: string;
    public readonly httpCode: number;
    public readonly isOperational: boolean;

    public readonly description?: string; 

    constructor(name: string, message: string, description: string | undefined, httpCode: number, isOperational: boolean) {
        super();
    
        this.name = name;
        this.message = message;
        this.httpCode = httpCode;
        this.description = description;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    };

    private static createHttpErrorInstance(name: string, message: string, description: string | undefined, httpCode: number, isOperational: boolean): HttpError {
        return new HttpError(name, message, description, httpCode, isOperational);
    };

    static BadRequest(description: string) {
        return this.createHttpErrorInstance(
            ReasonPhrases.BAD_REQUEST, 
            DefaultHttpErrorsMessages.BAD_REQUEST as string,
            description,
            StatusCodes.BAD_REQUEST, 
            true
        );
    };

    static NotFound(description: string){
        return this.createHttpErrorInstance(
            ReasonPhrases.NOT_FOUND,
            DefaultHttpErrorsMessages.NOT_FOUND as string,
            description,
            StatusCodes.NOT_FOUND, 
            true
        );
    };

    static Unauthorized(description: string) {
        return this.createHttpErrorInstance(
            ReasonPhrases.UNAUTHORIZED, 
            DefaultHttpErrorsMessages.UNAUTHORIZED as string,
            description,
            StatusCodes.UNAUTHORIZED,  
            true
        );
    };

    static Forbidden() {
        return this.createHttpErrorInstance(
            ReasonPhrases.FORBIDDEN, 
            DefaultHttpErrorsMessages.FORBIDDEN as string,
            undefined, 
            StatusCodes.FORBIDDEN, 
            true
        );
    };

    static Conflict(description: string) {
        return this.createHttpErrorInstance(
            ReasonPhrases.CONFLICT, 
            DefaultHttpErrorsMessages.CONFLICT as string,
            description, 
            StatusCodes.CONFLICT, 
            true
        );
    };

    static InternalServerError() {
        return this.createHttpErrorInstance(
            ReasonPhrases.INTERNAL_SERVER_ERROR, 
            DefaultHttpErrorsMessages.INTERNAL_SERVER_ERROR as string,
            undefined, 
            StatusCodes.INTERNAL_SERVER_ERROR,
            false
        );
    };
}

export default HttpError;