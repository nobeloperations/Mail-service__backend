import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import ContactService from '../services/contacts.service';
import ExceptionInterceptor from '../middlewares/exception-interceptor.middleware';


const createContact = async(req:Request,res: Response)=> {
    const contactData=req.body;

    const createdContact = await ContactService.createContact(contactData);

    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
};

const getContactById =async (req:Request,res:Response)=>{
    const id=req.params.id;

    const retrivedContactData = await ContactService.getContactById(id);

    res.status(StatusCodes.OK).json(retrivedContactData);
};

const deleteContactById = async (req:Request,res:Response)  =>{
    const id= req.params.id;

    const deletedContact= await ContactService.deleteContactById(id);
    
    res.status(StatusCodes.NO_CONTENT).json(deletedContact);
};

const updateContactById= async(req:Request,res:Response)=>{
    const id=req.params.id;
    const contactData=req.body;

    const updatedContactData=await ContactService.updateContactById(id,contactData);

    res.status(StatusCodes.OK).json(updatedContactData);
};

const getContactList = async (req: Request, res: Response) => {
    const { search = '', page = 1, pageSize = 10 } = req.query as ApiResourceFilteringParams;

    const result = await ContactService.getContactList({ page, pageSize, search });

    res.status(StatusCodes.OK).json(result);
};

const batchUpdatingContacts = async (req: Request, res: Response) => {
    const updatingData = req.body;

    const updatingResult = await ContactService.batchUpdatingContacts(updatingData);

    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
};

const batchDeletingContacts = async (req: Request, res: Response) => {
    const deletingData = req.body;

    const deletingResult = await ContactService.batchDeletingContacts(deletingData);

    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
};

export default {
    createContact: ExceptionInterceptor(createContact),
    getContactById: ExceptionInterceptor(getContactById),
    getContactList: ExceptionInterceptor(getContactList),
    deleteContactById: ExceptionInterceptor(deleteContactById),
    updateContactById: ExceptionInterceptor(updateContactById),
    batchUpdatingContacts: ExceptionInterceptor(batchUpdatingContacts),
    batchDeletingContacts: ExceptionInterceptor(batchDeletingContacts)
};