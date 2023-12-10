import { Request, Response } from 'express';
import ExceptionInterceptor from '../../api/middlewares/exception-interceptor.middleware';
import EmailOpenTrackingService from '../services/openedEmails.service'

const emailOpenTracking = async (req: Request, res: Response) => {
    const emailId = req.query.emailId as string

    await EmailOpenTrackingService.emailOpenTracking(emailId)

    const base64Image = 'R0lGODlhAQABAIAAAP///////ywAAAAAAQABAAACAkQBADs=';
    const imgBuffer = Buffer.from(base64Image, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': imgBuffer.length,
    });
    res.end(imgBuffer);
}

export default {
    emailOpenTracking: ExceptionInterceptor(emailOpenTracking)
}