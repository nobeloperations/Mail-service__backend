import BaseApiError from "../../utils/errors/custom-api-errors";
import { Request, Response, NextFunction } from 'express';
import Joi from "joi";

const validateBody = (schema: Joi.Schema) => {
    const func = (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        next(BaseApiError.BadRequest(error.message));
      }
      next();
    };
  
    return func;
  };

  export default validateBody