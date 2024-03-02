import { Request, Response } from 'express';

import MailingUnsubscribeService from '../services/mailing-unsubscriber.service';


const unsubscribeContactFromMailing = async (req: Request, _: Response) => {
    const { mailId } = req.params;
    
    await MailingUnsubscribeService.unsubscribeContactFromMailing(mailId);
};

export default {
    unsubscribeContactFromMailing
};