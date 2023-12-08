import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import ExceptionInterceptor from '../middlewares/exception-interceptor.middleware';
import MailTemplatesService from '../services/mail-templates.service';

const getMailTemplateDataById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const templateData = await MailTemplatesService.getMailTemplateDataById(id);

    res.status(StatusCodes.OK).send(templateData);
};

const getMailTemplatesList = async (req: Request, res: Response) => {
    const { page, pageSize } = req.query;
    const result = await MailTemplatesService.getMailTemplatesList({ 
        page: Number(page) || 1, 
        pageSize: Number(pageSize) || 10
    });    

    res.status(StatusCodes.OK).json(result);
};

const deleteMailTemplateById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await MailTemplatesService.deleteMailTemplateById(id);

    res.status(StatusCodes.NO_CONTENT).json(result);
};

const createMailTemplates = async (req: Request, res: Response) => {
    if (!req.files) {
        return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    }

    await MailTemplatesService.createMailTemplates(req.files)
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)
};

export default {
    createMailTemplates: ExceptionInterceptor(createMailTemplates),
    getMailTemplatesList: ExceptionInterceptor(getMailTemplatesList),
    deleteMailTemplateById: ExceptionInterceptor(deleteMailTemplateById),
    getMailTemplateDataById: ExceptionInterceptor(getMailTemplateDataById),
};