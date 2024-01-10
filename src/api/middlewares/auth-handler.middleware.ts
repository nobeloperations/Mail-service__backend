import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import HttpErrors from '../../utils/http-errors';
import prismaClient from '../../database/prisma-client';


const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { SECRET_KEY } = process.env;

  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    return next(HttpErrors.Unauthorized('Bearer token is required'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await prismaClient.users.findUnique({ where: { id } });

    if (!user || !user.token || user.token !== token) {
      next(HttpErrors.Unauthorized('Invalid or missing authentication token'));
    }

    req.user = user;

    next();
  } catch (error){
    return next(HttpErrors.Unauthorized(error.message));
  }
};

export default authenticate;
