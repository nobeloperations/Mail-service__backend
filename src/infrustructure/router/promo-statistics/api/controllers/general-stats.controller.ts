import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import GeneralStatsService from '../services/general-stats.service';


const getCountriesStats = async (_: Request, res: Response) => {
    const result = await GeneralStatsService.getCountriesStats();

    res.status(StatusCodes.OK).json(result);
};

const getContactsAgeStats = async (_: Request, res: Response) => {
    const result = await GeneralStatsService.getContactsAgeStats();

    res.status(StatusCodes.OK).json(result);
};

const getReferralResourcesStats = async (_: Request, res: Response) => {
    const result = await GeneralStatsService.getReferralResourcesStats();

    res.status(StatusCodes.OK).json(result);
};

const getYearsStats = async (_: Request, res: Response) => {
    const result = await GeneralStatsService.getYearsStats();

    res.status(StatusCodes.OK).json(result);
};

const getContactsNumberGroupedByCountry = async (_: Request, res: Response) => {
    const result = await GeneralStatsService.getContactsNumberGroupedByCountry();

    res.status(StatusCodes.OK).json(result); 
};

export default {
    getYearsStats,
    getCountriesStats,
    getContactsAgeStats,
    getReferralResourcesStats,
    getContactsNumberGroupedByCountry
};