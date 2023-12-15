import { Request, Response } from 'express';
import ExceptionInterceptor from '../../api/middlewares/exception-interceptor.middleware';
import UnsubscribeService from '../services/unsubscribe.service'

const unsubscribe = async (req: Request, res: Response) => {
    const id = req.query.contactId as string

    await UnsubscribeService.unsubscribe(id)

    res.status(200).json({message: "Unsubscribed success"})
}

export default {
    unsubscribe: ExceptionInterceptor(unsubscribe)
}