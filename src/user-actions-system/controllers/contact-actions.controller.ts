import { Request, Response } from 'express';
import ExceptionInterceptor from '../../api/middlewares/exception-interceptor.middleware';
import ContactActionsService from '../services/contact-actions.service'


const emailOpenTracking = async (req: Request, res: Response) => {
    const emailId = req.query.emailId as string

    await ContactActionsService.emailOpenTracking(emailId)

    const base64Image = 'R0lGODlhAQABAIAAAP///////ywAAAAAAQABAAACAkQBADs=';
    const imgBuffer = Buffer.from(base64Image, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': imgBuffer.length,
    });
    res.end(imgBuffer);
}

const emailLinkTracking = async (req: Request, res: Response) => {
    const emailId = req.query.emailId as string;
    const linkName = req.query.linkName as string;

    const redirectLink = linkName === "EduQuest" ? "https://eduquest.nobelexplorers.live" : "https://nobelexplorers.com/nobel-internships"

    await ContactActionsService.emailLinkTracking(emailId, linkName)

    res.redirect(redirectLink)
}

const unsubscribe = async (req: Request, res: Response) => {
    const id = req.query.contactId as string

    await ContactActionsService.unsubscribe(id)

    res.status(200).json({message: "Unsubscribed success"})
}

const unsubscribedContactsList = async (req: Request, res: Response) => {
    const users = await ContactActionsService.unsubscribedContactsList()

    res.status(200).json({users})
}

const unsubscribedContact = async (req: Request, res: Response) => {
    const id = req.params.id as string

    const user = await ContactActionsService.unsubscribedContact(id)

    res.status(200).json({user})
}


const contactActions = async (req: Request, res: Response) => {
    const { id } = req.params
    const typeOfActivity = typeof req.query.typeOfActivity === 'string' ? req.query.typeOfActivity : null;

    const userActions = await ContactActionsService.contactActions(id, typeOfActivity)

    res.status(200).json({
        userActions
    })
}

export default {
    contactActions: ExceptionInterceptor(contactActions),
    unsubscribe: ExceptionInterceptor(unsubscribe),
    unsubscribedContactsList: ExceptionInterceptor(unsubscribedContactsList),
    unsubscribedContact: ExceptionInterceptor(unsubscribedContact),
    emailOpenTracking: ExceptionInterceptor(emailOpenTracking),
    emailLinkTracking: ExceptionInterceptor(emailLinkTracking)
}