import { NextFunction, Request, Response } from 'express';

import HttpError from '../../utils/http-errors';


const requestIdValidator = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(HttpError.BadRequest(`Is not a valid ObjectId: ${id}`));
  }

  next();
};

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export default requestIdValidator;