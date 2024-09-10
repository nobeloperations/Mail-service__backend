import { Request, Response } from 'express';
import CompilerMailingService from '../service';

const setCompilerMailing = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const notFoundRecipients = await CompilerMailingService.setCompilerMailing(data);
    
        res.status(200).send({
            status: 'OK', 
            notFoundRecipients: notFoundRecipients 
        })

    } catch(e) {
        console.log(e);
        res.status(500).send('Server error');
    }
};

export default {
    setCompilerMailing
};