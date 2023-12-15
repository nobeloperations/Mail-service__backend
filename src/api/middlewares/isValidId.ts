import { NextFunction, Request, Response } from "express";

import BaseApiError from "../../utils/errors/custom-api-errors";

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(BaseApiError.BadRequest(`${id} is not valid id`));
  }
  next();
};

function isValidObjectId(id: string) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}

export default isValidId