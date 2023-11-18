import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import ScheduleMailService from '../services/scheduled-mails.service';

const createMails = async (req: Request, res: Response) => {
    const mailsData = req.body;
    const createdMails = await ScheduleMailService.createMails(mailsData);
    
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
};

const getMailById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const retrievedMailData = await ScheduleMailService.getMailById(id);

    res.status(StatusCodes.OK).json(retrievedMailData);
};

const deleteMailById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedMailData = await ScheduleMailService.deleteMailById(id);

    res.status(StatusCodes.NO_CONTENT).json(deletedMailData);
};

const updateMailById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const mailData = req.body;

    const updatedMailData = await ScheduleMailService.updateMailById(id, mailData); 

    res.status(StatusCodes.OK).json(updatedMailData);
};

const getMailsList = async (req: Request, res: Response) => {
    const result = await ScheduleMailService.getMailsList();

    res.status(StatusCodes.OK).json(result);
};

export default {
    createMails,
    getMailById,
    deleteMailById,
    updateMailById,
    getMailsList,
};