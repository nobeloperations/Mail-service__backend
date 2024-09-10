import { Request, Response, NextFunction } from 'express';

import HttpErrors from '../../utils/http-errors';

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let errorResponse: HttpErrorResponse;
    console.log(error)
    if (error instanceof HttpErrors) {
        errorResponse = {
            code: error.httpCode,
            name: error.name,
            message: error.message,
            description: error.description,
        };
    } else {
        console.log(error)
        const internalServerError = HttpErrors.InternalServerError();
        errorResponse = {
            code: internalServerError.httpCode,
            name: internalServerError.name,
            message: internalServerError.message,
        };
    }
    console.log(error)
    return res.json({ error: errorResponse });
};

export default errorHandler;