import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

import BaseApiError from '../../utils/http-errors';

const prismaErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                next(BaseApiError.Conflict(`Unique constraint failed on the field: ${error.meta.target}`));
                break;
            case 'P2000':
                next(BaseApiError.BadRequest(`The provided value for the column is too long for the column's type. Column: ${error.meta.target}`));
                break;
            case 'P2025':
                next(BaseApiError.NotFound(`The requested resource could not be found on the server\nCause: ${error.meta.cause}`));
                break;
            case 'P2016':
                next(BaseApiError.NotFound(`Record not found in the where clause. Where: ${JSON.stringify(error.meta.where)}`));
                break;
            case 'P2014':
                next(BaseApiError.BadRequest(`The change you are trying to make would violate the required relation '${error.meta.relation_name}' between the '${error.meta.model_a_name}' and '${error.meta.model_b_name}' models`));
                break;
            default:
                next(BaseApiError.InternalServerError());
        }
    } else {
        next(error);
    }
};

export default prismaErrorHandler;