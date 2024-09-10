import { Request, Response } from 'express';

import TrackMailOpeningService from '../services/track-mail-opening.service';


const trackMailOpening = async (req: Request, _: Response) => {
    const { mailId } = req.params;

    await TrackMailOpeningService.trackMailOpening(mailId);
};

export default {
    trackMailOpening
};