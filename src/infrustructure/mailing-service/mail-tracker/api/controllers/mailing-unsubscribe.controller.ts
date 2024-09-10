import { Request, Response } from 'express';

import MailingUnsubscribeService from '../services/mailing-unsubscriber.service';


const unsubscribeContactFromMailing = async (req: Request, res: Response) => {
    const { mailId } = req.params;
    
    await MailingUnsubscribeService.unsubscribeContactFromMailing(mailId);

    res.redirect(process.env.UNSUBSCRIBE_MAILING_REDIRECT_LINK)    
};

export default {
    unsubscribeContactFromMailing
};