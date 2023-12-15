import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ContactsListsService from '../services/contacts-lists.service';
import ExceptionInterceptor from '../middlewares/exception-interceptor.middleware';

const createContactsList = async (req: Request, res: Response) => {
    const contactsListData = req.body;
    const result = await ContactsListsService.createContactsList(contactsListData);

    res.status(StatusCodes.CREATED).json(result);
};

const updateContactListById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const contactsListData = req.body;
    const result = await ContactsListsService.updateContactListById(id, contactsListData);
    
    res.status(StatusCodes.OK).json(result);
};

const deleteContactsListById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ContactsListsService.deleteContactsListById(id);

    res.status(StatusCodes.NO_CONTENT).json(result);
};

const getListContactsLists = async (req: Request, res: Response) => {
    const { page, pageSize } = req.query;
    const result = await ContactsListsService.getListContactsLists({ 
        page: Number(page) || 1, 
        pageSize: Number(pageSize) || 10
    }); 

    res.status(StatusCodes.OK).json(result)
};

export default {
    createContactsList: ExceptionInterceptor(createContactsList),
    updateContactListById: ExceptionInterceptor(updateContactListById),
    deleteContactsListById: ExceptionInterceptor(deleteContactsListById),
    getListContactsLists: ExceptionInterceptor(getListContactsLists)
};