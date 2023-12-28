import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import HttpErrors from '../../utils/http-errors';


const requestBodyValidator = (schema: Joi.Schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return next(HttpErrors.BadRequest(`Invalid request body structure: ${error.details.map(detail => detail.message).join(', ')}`));
  }

  next();
};

export default requestBodyValidator;