import { Request, Response } from 'express';
import ExceptionInterceptor from '../../api/middlewares/exception-interceptor.middleware';
import UserActionsService from '../services/userActions.service'
import createHttpError from '../helpers/HttpError'

const userActions = async (req: Request, res: Response) => {
    const { id } = req.params
    const typeOfActivity = typeof req.query.typeOfActivity === 'string' ? req.query.typeOfActivity : null;

    const userActions = await UserActionsService.userActions(id, typeOfActivity)

    res.status(200).json({
        userActions
    })
}

export default {
    userActions: ExceptionInterceptor(userActions)
}