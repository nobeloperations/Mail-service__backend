import prismaClient from '../../database/prisma-client';

const retrieveContactData = async (id: string) => {
    const contact = await prismaClient.contact.findUnique({ where: { id }});

    return contact;
};

export default {
    retrieveContactData
}