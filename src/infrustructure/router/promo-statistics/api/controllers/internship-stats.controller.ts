import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import InternshipStatsService from '../services/internship-stats.service';


const getContactResults = async (req: Request, res: Response) => {
    const { intakeId } = req.params;

    const result = await InternshipStatsService.getContactResults(intakeId);

    res.status(StatusCodes.OK).json(result);
};

const getGlobalDistributionStats = async (req: Request, res: Response) => {
    const { intakeId } = req.params;

    const result = await InternshipStatsService.getGlobalDistributionStats(intakeId);

    res.status(StatusCodes.OK).json(result);
};

const getContactsAgeStats = async (req: Request, res: Response) => {
    const { intakeId } = req.params;

    const result = await InternshipStatsService.getContactsAgeStats(intakeId);

    res.status(StatusCodes.OK).json(result);
};

const getSuccessfulPassedStatsByCountry = async (req: Request, res: Response) => {
    const { intakeId } = req.params;

    const result = await InternshipStatsService.getSuccessfulPassedStatsByCountry(intakeId);

    res.status(StatusCodes.OK).json(result);
};

export default {
    getContactResults,
    getContactsAgeStats,
    getGlobalDistributionStats,
    getSuccessfulPassedStatsByCountry,
};