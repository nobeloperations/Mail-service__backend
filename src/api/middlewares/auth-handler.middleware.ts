import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) { 
    return next(); 
  };

  return res.sendStatus(StatusCodes.UNAUTHORIZED);
};

export default isAuthenticated;
