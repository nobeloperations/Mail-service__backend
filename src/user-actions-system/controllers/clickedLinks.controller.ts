import { Request, Response } from 'express';
import ExceptionInterceptor from '../../api/middlewares/exception-interceptor.middleware';
import EmailLinkTrackingService from '../services/clickedLinks.service'

const emailLinkTracking = async (req: Request, res: Response) => {
    const contactId = req.query.contactId as string

    await EmailLinkTrackingService.emailLinkTracking(contactId)

    res.json({message: "progress"})
}

export default {
    emailLinkTracking: ExceptionInterceptor(emailLinkTracking)
}