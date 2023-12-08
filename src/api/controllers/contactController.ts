import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import contactService from '../services/contactService';
const createContact=async(req:Request,res: Response)=>
{
    const contactData=req.body;
    const createdContact =await contactService.createContact(contactData);
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
};

const getContactById =async (req:Request,res:Response)=>{

    const id=req.params.id;
    const retrivedContactData = await contactService.getContactById(id);
    res.status(StatusCodes.OK).json(retrivedContactData);
};
const deleteContactById = async (req:Request,res:Response)  =>{
    const id= req.params.id;
    const deletedContact= await contactService.deleteContactById(id);
    res.status(StatusCodes.NO_CONTENT).json(deletedContact);
};
const updateContactById= async(req:Request,res:Response)=>{
    const id=req.params.id;
    const contactData=req.body;

    const updatedContactData=await contactService.updateContactById(id,contactData);
    res.status(StatusCodes.OK).json(updatedContactData);
};
const getContactList = async(req:Request,res:Response) =>{
    const result=await contactService.getContactList()
    res.status(StatusCodes.OK).json(result);
};
export default {
    createContact,
    getContactById,
    deleteContactById,
    updateContactById,
    getContactList,
};