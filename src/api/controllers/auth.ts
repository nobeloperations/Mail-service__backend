import AuthService from '../services/auth.service'
import { Request, Response } from 'express';
import ExceptionInterceptor from '../middlewares/exception-interceptor.middleware';
import prismaClient from '../../database/prisma-client';

const register = async (req: Request, res: Response) => {
    const user = await AuthService.register(req.body)

    res.status(201).json(user);
  };
  
  const login = async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body)

    res.status(200).json(result);
  };
  
  const logout = async (req: Request, res: Response) => {
    const { id } = req.user;

    await prismaClient.users.update({ where: { id }, data: { token: "" }});
  
    res.status(200).json({ message: "Logout success" });
  };

  const current = async (req: Request, res: Response) => {
    const { email, name } = req.user;
  
    res.status(200).json({ user: { email, name } });
  };

export default {
    register: ExceptionInterceptor(register),
    login: ExceptionInterceptor(login),
    logout: ExceptionInterceptor(logout),
    current: ExceptionInterceptor(current)
}