import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import BaseApiError from '../../utils/errors/custom-api-errors';


const errorHandler = (
    error: BaseApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error instanceof BaseApiError 
        ? error.httpCode 
        : StatusCodes.INTERNAL_SERVER_ERROR;
    
    res.status(statusCode).json({
        name: error.name,
        msg: error instanceof BaseApiError 
            ? error.message 
            : 'Internal server error',
    });
};

export default errorHandler;