import { Request, Response } from 'express';
import ExceptionInterceptor from '../../api/middlewares/exception-interceptor.middleware';
import EmailLinkTrackingService from '../services/clickedLinks.service'

const emailLinkTracking = async (req: Request, res: Response) => {
    const emailId = req.query.emailId as string;
    const linkName = req.query.linkName as string;

    const redirectLink = linkName === "EduQuest" ? "https://eduquest.nobelexplorers.live" : "https://nobelexplorers.com/nobel-internships"

    await EmailLinkTrackingService.emailLinkTracking(emailId, linkName)

    res.redirect(redirectLink)
}

export default {
    emailLinkTracking: ExceptionInterceptor(emailLinkTracking)
}