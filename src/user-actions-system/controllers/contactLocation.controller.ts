import { Request, Response } from 'express';
import { fetchLocation } from '../services/contactLocation.service';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const getLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const contactIP = req.ip;

    
    const locationData = await fetchLocation(contactIP);

    // Check if the location data is available
    if (locationData) {
      res.status(StatusCodes.OK).json(locationData);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Location data not found' });
    }
  } catch (error) {
    console.error('Error in getLocation controller:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};