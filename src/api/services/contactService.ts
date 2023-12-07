import { Prisma } from '@prisma/client';
// import from "@prisma/client"
import prismaClient from '../../database/prisma-client';

const createContact = async (contactData: Prisma.ContactCreateManyInput[]) => {
    const result = await prismaClient.contact.createMany({ data: contactData });
    return result;
};
const getContactList = async () => {
    const result = await prismaClient.contact.findMany();
    return result;
};  
const deleteContactById=async(id:string)=>{
    const result=await prismaClient.contact.delete({where:{id}});
    return result;
};
const updateContactById = async (id: string, contactData: Prisma.ContactUpdateInput) => {
    const result = await prismaClient.contact.update({ where: { id }, data: contactData });
    return result;
};
const getContactById = async (id:string)=>{
    const result=await prismaClient.contact.findUnique({where:{id}});
    return result;
};

export default{
    createContact,
    getContactList,
    deleteContactById,
    updateContactById,
    getContactById
};
