import { Router, Response, Request } from 'express';
import ContactService from '../../../api/services/contacts.service';
import validateBody from '../../../api/middlewares/request-body-validator';
import contactsSchema from '../../../api/request-schemas/contacts.request-schemas';
import { getLocationByIpAddress } from '../../../user-actions-system/services/contactLocation.service';
import { StatusCodes } from 'http-status-codes';

const router = Router()

router.post("/", validateBody(contactsSchema.createResourse), async (req: Request, res: Response) => {
    try {
        const contactData = req.body;
        const userIpAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
        const userLocation = await getLocationByIpAddress(userIpAddress);
    
        if (userLocation && (userLocation.country === 'Russia' || userLocation.country === 'Belarus')) {
            return res.status(StatusCodes.FORBIDDEN).json('It is not possible to create a contact from Russia or Belarus').end();
        }
    
        const contact = await ContactService.createContact({...contactData, ...userLocation });
        res.status(StatusCodes.CREATED).json({contact});
    } catch {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
})

export default router