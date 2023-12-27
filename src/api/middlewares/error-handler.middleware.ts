import { Request, Response, NextFunction } from 'express';

import HttpError from '../../utils/http-errors';

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let errorResponse: HttpErrorResponse;

    if (error instanceof HttpError) {
        errorResponse = {
            code: error.httpCode,
            name: error.name,
            message: error.message,
            description: error.description,
        };
    } else {
        const internalServerError = HttpError.InternalServerError();
        errorResponse = {
            code: internalServerError.httpCode,
            name: internalServerError.name,
            message: internalServerError.message,
        };
    }

    return res.json({ error: errorResponse });
};

export default errorHandler;