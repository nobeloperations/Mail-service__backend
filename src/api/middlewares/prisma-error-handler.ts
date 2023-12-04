import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

import BaseApiError from '../../utils/errors/custom-api-errors';


const prismaErrorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            next(BaseApiError.NotFound(`The requested resource could not be found on the server\nCause: ${error.meta.cause}`));
        }
    }

    next(error);
};

export default prismaErrorHandler;