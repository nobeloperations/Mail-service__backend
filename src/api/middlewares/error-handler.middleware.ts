import { Request, Response, NextFunction } from 'express';

import HttpErrors from '../../utils/http-errors';

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let errorResponse: HttpErrorResponse;

    if (error instanceof HttpErrors) {
        errorResponse = {
            code: error.httpCode,
            name: error.name,
            message: error.message,
            description: error.description,
        };
    } else {
        const internalServerError = HttpErrors.InternalServerError();
        errorResponse = {
            code: internalServerError.httpCode,
            name: internalServerError.name,
            message: internalServerError.message,
        };
    }

    return res.json({ error: errorResponse });
};

export default errorHandler;