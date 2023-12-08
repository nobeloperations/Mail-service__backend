const jwt = require("jsonwebtoken");

import { NextFunction, Request, Response } from 'express';
import prismaClient from '../../database/prisma-client';
import BaseApiError from '../../utils/errors/custom-api-errors';
const { SECRET_KEY } = process.env;

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(BaseApiError.Unauthorized("Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await prismaClient.users.findUnique({ where: {id}});

    if (!user || !user.token || user.token !== token) {
      next(BaseApiError.Unauthorized("Not authorized"));
    }

    req.user = user;
    next();
  } catch {
    next(BaseApiError.Unauthorized("Not authorized"));
  }
};

export default authenticate;
