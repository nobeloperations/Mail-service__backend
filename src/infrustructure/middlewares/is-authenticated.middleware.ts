import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';


function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      return next();
    }
  
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
};

export default isAuthenticated;